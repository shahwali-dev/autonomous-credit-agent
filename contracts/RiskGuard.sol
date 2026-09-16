// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract RiskGuard {
    uint256 public constant MAX_CREDIT_EXPOSURE = 5000;
    uint256 public constant MIN_COLLATERAL_BPS = 5000; // 50%
    uint256 public constant MAX_DURATION_DAYS = 90;

    enum RiskLevel {
        LOW,
        MEDIUM,
        HIGH
    }

    struct CreditTerms {
        uint256 amount;
        uint256 durationDays;
        uint256 collateral;
        bool evidenceVerified;
        RiskLevel risk;
    }

    event CreditValidated(
        address indexed borrower,
        uint256 amount,
        uint256 durationDays,
        bool approved
    );

    function validate(
        CreditTerms calldata terms
    ) external returns (bool) {
        require(
            terms.amount <= MAX_CREDIT_EXPOSURE,
            "RiskGuard: credit exposure exceeded"
        );

        require(
            terms.amount == 0 ||
                terms.collateral * 10_000 >=
                terms.amount * MIN_COLLATERAL_BPS,
            "RiskGuard: insufficient collateral"
        );

        require(
            terms.durationDays <= MAX_DURATION_DAYS,
            "RiskGuard: duration exceeded"
        );

        require(
            terms.evidenceVerified,
            "RiskGuard: evidence not verified"
        );

        require(
            terms.risk == RiskLevel.LOW ||
                terms.risk == RiskLevel.MEDIUM,
            "RiskGuard: risk too high"
        );

        emit CreditValidated(
            msg.sender,
            terms.amount,
            terms.durationDays,
            true
        );

        return true;
    }
}
