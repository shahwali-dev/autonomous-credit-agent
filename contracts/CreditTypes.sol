// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

library CreditTypes {
    struct CreditApplication {
        address borrower;
        uint256 requestedAmount;
        uint256 durationDays;
        uint256 collateral;
    }

    struct VerifiedEvidence {
        uint256 repaymentCount;
        uint256 failedObligations;
        uint256 collateral;
        uint256 activityStart;
        uint256 activityEnd;
    }

    struct CreditDecision {
        uint256 approvedAmount;
        uint256 durationDays;
        uint8 risk;
        bool approved;
    }
}
