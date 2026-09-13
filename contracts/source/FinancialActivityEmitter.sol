// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract FinancialActivityEmitter {
    struct BorrowerActivity {
        uint256 repaymentCount;
        uint256 failedObligations;
        uint256 collateral;
        uint256 activityStart;
        uint256 activityEnd;
    }

    mapping(address => BorrowerActivity) private activities;

    event RepaymentRecorded(
        address indexed borrower,
        uint256 indexed repaymentId,
        uint256 amount,
        uint256 timestamp
    );

    event CollateralRecorded(
        address indexed borrower,
        uint256 amount,
        uint256 timestamp
    );

    event ObligationFailureRecorded(
        address indexed borrower,
        uint256 indexed obligationId,
        uint256 timestamp
    );

    event ActivityRecorded(
        address indexed borrower,
        uint256 timestamp
    );

    function recordRepayment(
        uint256 repaymentId,
        uint256 amount
    ) external {
        require(amount > 0, "Amount must be greater than zero");

        BorrowerActivity storage activity = activities[msg.sender];

        activity.repaymentCount += 1;

        if (activity.activityStart == 0) {
            activity.activityStart = block.timestamp;
        }

        activity.activityEnd = block.timestamp;

        emit RepaymentRecorded(
            msg.sender,
            repaymentId,
            amount,
            block.timestamp
        );

        emit ActivityRecorded(
            msg.sender,
            block.timestamp
        );
    }

    function recordCollateral(
        uint256 amount
    ) external {
        require(amount > 0, "Collateral must be greater than zero");

        BorrowerActivity storage activity = activities[msg.sender];

        activity.collateral += amount;

        if (activity.activityStart == 0) {
            activity.activityStart = block.timestamp;
        }

        activity.activityEnd = block.timestamp;

        emit CollateralRecorded(
            msg.sender,
            amount,
            block.timestamp
        );

        emit ActivityRecorded(
            msg.sender,
            block.timestamp
        );
    }

    function recordObligationFailure(
        uint256 obligationId
    ) external {
        BorrowerActivity storage activity = activities[msg.sender];

        activity.failedObligations += 1;

        if (activity.activityStart == 0) {
            activity.activityStart = block.timestamp;
        }

        activity.activityEnd = block.timestamp;

        emit ObligationFailureRecorded(
            msg.sender,
            obligationId,
            block.timestamp
        );

        emit ActivityRecorded(
            msg.sender,
            block.timestamp
        );
    }

    function getActivity(
        address borrower
    )
        external
        view
        returns (
            uint256 repaymentCount,
            uint256 failedObligations,
            uint256 collateral,
            uint256 activityStart,
            uint256 activityEnd
        )
    {
        BorrowerActivity memory activity = activities[borrower];

        return (
            activity.repaymentCount,
            activity.failedObligations,
            activity.collateral,
            activity.activityStart,
            activity.activityEnd
        );
    }
}