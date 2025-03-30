// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StablecoinMock is ERC20 {
    constructor() ERC20("Stablecoin", "STBL") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}