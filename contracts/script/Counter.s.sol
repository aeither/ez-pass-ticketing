// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {SimpleTicketingSystem} from "../src/Counter.sol";

contract CounterScript is Script {
    SimpleTicketingSystem public counter;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        counter = new SimpleTicketingSystem();

        vm.stopBroadcast();
    }
}
