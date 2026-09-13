// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {FinancialActivityEmitter} from "../contracts/source/FinancialActivityEmitter.sol";

contract FinancialActivityEmitterTest is Test {
    FinancialActivityEmitter internal emitter;

    address internal borrower = address(0xBEEF);

    function setUp() public {
        emitter = new FinancialActivityEmitter();
    }

    function testRecordRepayment() public {
        vm.prank(borrower);

        vm.expectEmit(true, true, false, true);
        emit FinancialActivityEmitter.RepaymentRecorded(
            borrower,
            1,
            500 ether,
            block.timestamp
        );

        vm.expectEmit(true, false, false, true);
        emit FinancialActivityEmitter.ActivityRecorded(
            borrower,
            block.timestamp
        );

        emitter.recordRepayment(1, 500 ether);

        (
            uint256 repaymentCount,
            uint256 failedObligations,
            uint256 collateral,
            uint256 activityStart,
            uint256 activityEnd
        ) = emitter.getActivity(borrower);

        assertEq(repaymentCount, 1);
        assertEq(failedObligations, 0);
        assertEq(collateral, 0);
        assertGt(activityStart, 0);
        assertEq(activityEnd, activityStart);
    }

    function testRecordCollateral() public {
        vm.prank(borrower);

        vm.expectEmit(true, false, false, true);
        emit FinancialActivityEmitter.CollateralRecorded(
            borrower,
            1500 ether,
            block.timestamp
        );

        vm.expectEmit(true, false, false, true);
        emit FinancialActivityEmitter.ActivityRecorded(
            borrower,
            block.timestamp
        );

        emitter.recordCollateral(1500 ether);

        (
            uint256 repaymentCount,
            uint256 failedObligations,
            uint256 collateral,
            uint256 activityStart,
            uint256 activityEnd
        ) = emitter.getActivity(borrower);

        assertEq(repaymentCount, 0);
        assertEq(failedObligations, 0);
        assertEq(collateral, 1500 ether);
        assertGt(activityStart, 0);
        assertEq(activityEnd, activityStart);
    }

    function testRecordObligationFailure() public {
        vm.prank(borrower);

        vm.expectEmit(true, true, false, true);
        emit FinancialActivityEmitter.ObligationFailureRecorded(
            borrower,
            1,
            block.timestamp
        );

        vm.expectEmit(true, false, false, true);
        emit FinancialActivityEmitter.ActivityRecorded(
            borrower,
            block.timestamp
        );

        emitter.recordObligationFailure(1);

        (
            uint256 repaymentCount,
            uint256 failedObligations,
            uint256 collateral,
            uint256 activityStart,
            uint256 activityEnd
        ) = emitter.getActivity(borrower);

        assertEq(repaymentCount, 0);
        assertEq(failedObligations, 1);
        assertEq(collateral, 0);
        assertGt(activityStart, 0);
        assertEq(activityEnd, activityStart);
    }

    function testMultipleFinancialActivities() public {
        vm.startPrank(borrower);

        emitter.recordRepayment(1, 500 ether);
        emitter.recordRepayment(2, 750 ether);
        emitter.recordCollateral(1500 ether);
        emitter.recordObligationFailure(1);

        vm.stopPrank();

        (
            uint256 repaymentCount,
            uint256 failedObligations,
            uint256 collateral,
            uint256 activityStart,
            uint256 activityEnd
        ) = emitter.getActivity(borrower);

        assertEq(repaymentCount, 2);
        assertEq(failedObligations, 1);
        assertEq(collateral, 1500 ether);
        assertGt(activityStart, 0);
        assertGe(activityEnd, activityStart);
    }

    function testRevertWhenRepaymentAmountIsZero() public {
        vm.prank(borrower);

        vm.expectRevert("Amount must be greater than zero");

        emitter.recordRepayment(1, 0);
    }

    function testRevertWhenCollateralAmountIsZero() public {
        vm.prank(borrower);

        vm.expectRevert("Collateral must be greater than zero");

        emitter.recordCollateral(0);
    }
}
