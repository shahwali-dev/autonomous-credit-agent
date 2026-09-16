// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ASCBase} from "@gluwa/asc-contracts/contracts/readability/ASCBase.sol";
import {EvmV1Decoder} from "@gluwa/asc-contracts/contracts/common/EvmV1Decoder.sol";

contract CreditASC is ASCBase {
    bytes32 public constant REPAYMENT_RECORDED =
        0xf4d1d5b6e9b80724a891dcf63afc50c8d8accd13641acc04628b21c4db748777;

    bytes32 public constant COLLATERAL_RECORDED =
        0xda6d0af1ff1fb1defbd7c0064f5418c62b114f0a2d7fe311dd71939fa8d1b692;

    bytes32 public constant OBLIGATION_FAILURE_RECORDED =
        0x33915fa74aa4ad39fb950beb4bc6b78306a324a558d55f811d52f7cb2417dc4a;

    address public sourceContract;

    struct VerifiedEvidence {
        uint256 repaymentCount;
        uint256 failedObligations;
        uint256 collateral;
        uint256 activityStart;
        uint256 activityEnd;
    }

    mapping(address => VerifiedEvidence) private verifiedEvidence;

    function getVerifiedEvidence(
        address borrower
    ) external view returns (VerifiedEvidence memory) {
        return verifiedEvidence[borrower];
    }

    event CreditEvidenceVerified(
        bytes32 indexed queryId,
        address indexed borrower,
        uint8 action
    );

    constructor(address _sourceContract) {
        require(_sourceContract != address(0), "Invalid source contract");
        sourceContract = _sourceContract;
    }

    function _processAndEmitEvent(
        uint8 action,
        bytes32 queryId,
        bytes memory encodedTransaction
    ) internal override {
        EvmV1Decoder.ReceiptFields memory receipt =
            EvmV1Decoder.decodeReceiptFields(encodedTransaction);

        require(receipt.receiptStatus == 1, "Source transaction failed");

        bytes32 eventSignature;

        if (action == 1) {
            eventSignature = REPAYMENT_RECORDED;
        } else if (action == 2) {
            eventSignature = COLLATERAL_RECORDED;
        } else if (action == 3) {
            eventSignature = OBLIGATION_FAILURE_RECORDED;
        } else {
            revert("Invalid action");
        }

        EvmV1Decoder.LogEntry[] memory logs =
            EvmV1Decoder.getLogsByEventSignature(
                receipt,
                eventSignature
            );

        require(logs.length > 0, "Evidence event not found");

        bool foundSourceLog = false;
        address borrower;

        for (uint256 i = 0; i < logs.length; i++) {
            if (logs[i].address_ == sourceContract) {
                require(logs[i].topics.length >= 2, "Invalid evidence log");

                borrower = address(uint160(uint256(logs[i].topics[1])));

                if (action == 1) {
                    require(logs[i].topics.length == 3, "Invalid repayment log");
                    require(logs[i].data.length == 64, "Invalid repayment data");

                    (uint256 amount, uint256 timestamp) =
                        abi.decode(logs[i].data, (uint256, uint256));

                    VerifiedEvidence storage evidence = verifiedEvidence[borrower];

                    evidence.repaymentCount += 1;

                    if (evidence.activityStart == 0) {
                        evidence.activityStart = timestamp;
                    }

                    evidence.activityEnd = timestamp;

                    // Keep the decoded amount in the verified flow.
                    // The current aggregate model tracks repayment count.
                    amount;
                } else if (action == 2) {
                    require(logs[i].topics.length == 2, "Invalid collateral log");
                    require(logs[i].data.length == 64, "Invalid collateral data");

                    (uint256 amount, uint256 timestamp) =
                        abi.decode(logs[i].data, (uint256, uint256));

                    VerifiedEvidence storage evidence = verifiedEvidence[borrower];

                    evidence.collateral += amount;

                    if (evidence.activityStart == 0) {
                        evidence.activityStart = timestamp;
                    }

                    evidence.activityEnd = timestamp;
                } else if (action == 3) {
                    require(logs[i].topics.length == 3, "Invalid failure log");
                    require(logs[i].data.length == 32, "Invalid failure data");

                    uint256 timestamp = abi.decode(logs[i].data, (uint256));

                    VerifiedEvidence storage evidence = verifiedEvidence[borrower];

                    evidence.failedObligations += 1;

                    if (evidence.activityStart == 0) {
                        evidence.activityStart = timestamp;
                    }

                    evidence.activityEnd = timestamp;
                }

                foundSourceLog = true;
                break;
            }
        }

        require(foundSourceLog, "Source contract log not found");

        emit CreditEvidenceVerified(queryId, borrower, action);
    }
}
