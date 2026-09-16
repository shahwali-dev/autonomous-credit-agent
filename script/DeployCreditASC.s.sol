// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {CreditASC} from "../contracts/CreditASC.sol";

contract DeployCreditASC is Script {
    address internal constant SOURCE_CONTRACT =
        0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d;

    function run() external returns (CreditASC creditASC) {
        vm.startBroadcast();

        creditASC = new CreditASC(SOURCE_CONTRACT);

        vm.stopBroadcast();
    }
}
