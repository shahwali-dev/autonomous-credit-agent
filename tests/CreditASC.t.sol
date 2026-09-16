// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {CreditASC} from "../contracts/CreditASC.sol";

contract CreditASCTest is Test {
    CreditASC internal creditASC;

    address internal sourceContract =
        0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d;

    function setUp() public {
        creditASC = new CreditASC(sourceContract);
    }

    function testSourceContractIsConfigured() public {
        assertEq(creditASC.sourceContract(), sourceContract);
    }

    function testEventSignaturesAreConfigured() public {
        assertTrue(creditASC.REPAYMENT_RECORDED() != bytes32(0));
        assertTrue(creditASC.COLLATERAL_RECORDED() != bytes32(0));
        assertTrue(
            creditASC.OBLIGATION_FAILURE_RECORDED() != bytes32(0)
        );
    }

    function testRejectsZeroSourceContract() public {
        vm.expectRevert("Invalid source contract");
        new CreditASC(address(0));
    }

    function testVerifiedEvidenceStartsEmpty() public view {
        CreditASC.VerifiedEvidence memory evidence =
            creditASC.getVerifiedEvidence(address(0x1234));

        assertEq(evidence.repaymentCount, 0);
        assertEq(evidence.failedObligations, 0);
        assertEq(evidence.collateral, 0);
        assertEq(evidence.activityStart, 0);
        assertEq(evidence.activityEnd, 0);
    }
}
