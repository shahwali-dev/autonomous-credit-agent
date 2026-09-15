// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {FinancialActivityEmitter} from "../contracts/source/FinancialActivityEmitter.sol";

contract DeployFinancialActivityEmitter is Script {
    function run() external returns (FinancialActivityEmitter emitter) {
        vm.startBroadcast();

        emitter = new FinancialActivityEmitter();

        vm.stopBroadcast();
    }
}
