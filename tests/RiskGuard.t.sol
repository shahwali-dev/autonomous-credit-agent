// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {RiskGuard} from "../contracts/RiskGuard.sol";

contract RiskGuardTest is Test {
    RiskGuard internal riskGuard;

    function setUp() public {
        riskGuard = new RiskGuard();
    }

    function validTerms()
        internal
        pure
        returns (RiskGuard.CreditTerms memory)
    {
        return RiskGuard.CreditTerms({
            amount: 1000,
            durationDays: 30,
            collateral: 2000,
            evidenceVerified: true,
            risk: RiskGuard.RiskLevel.LOW
        });
    }

    function testValidTermsPass() public {
        RiskGuard.CreditTerms memory terms = validTerms();

        bool result = riskGuard.validate(terms);

        assertTrue(result);
    }

    function testRejectsExcessiveCredit() public {
        RiskGuard.CreditTerms memory terms = validTerms();
        terms.amount = 5001;

        vm.expectRevert("RiskGuard: credit exposure exceeded");
        riskGuard.validate(terms);
    }

    function testRejectsInsufficientCollateral() public {
        RiskGuard.CreditTerms memory terms = validTerms();
        terms.amount = 1000;
        terms.collateral = 499;

        vm.expectRevert("RiskGuard: insufficient collateral");
        riskGuard.validate(terms);
    }

    function testRejectsExcessiveDuration() public {
        RiskGuard.CreditTerms memory terms = validTerms();
        terms.durationDays = 91;

        vm.expectRevert("RiskGuard: duration exceeded");
        riskGuard.validate(terms);
    }

    function testRejectsUnverifiedEvidence() public {
        RiskGuard.CreditTerms memory terms = validTerms();
        terms.evidenceVerified = false;

        vm.expectRevert("RiskGuard: evidence not verified");
        riskGuard.validate(terms);
    }

    function testRejectsHighRisk() public {
        RiskGuard.CreditTerms memory terms = validTerms();
        terms.risk = RiskGuard.RiskLevel.HIGH;

        vm.expectRevert("RiskGuard: risk too high");
        riskGuard.validate(terms);
    }
}
