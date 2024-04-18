// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract SimpleStorageUpgradeable is Initializable, OwnableUpgradeable {
    uint256 private _value;

    function initialize(uint256 value) public initializer {
        __Ownable_init(msg.sender);
        _value = value;
    }

    function getValue() public view returns (uint256) {
        return _value;
    }

    function setValue(uint256 value) public onlyOwner {
        _value = value;
    }
}