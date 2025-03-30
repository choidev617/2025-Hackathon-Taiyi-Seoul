// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title VehicleNFT - 차량 NFT 스마트 계약
contract VehicleNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    struct VehicleInfo {
        string vin;
        string fuelType;
        string battery;
        string year;
        string mileage;
    }

    mapping(uint256 => VehicleInfo) public vehicleData;

    constructor() ERC721("AutoFi Vehicle", "AUTO") Ownable(msg.sender) {}

    function mintVehicleNFT(
        address to,
        string memory tokenURI,
        string memory vin,
        string memory fuelType,
        string memory battery,
        string memory year,
        string memory mileage
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = nextTokenId++;

        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        vehicleData[tokenId] = VehicleInfo({
            vin: vin,
            fuelType: fuelType,
            battery: battery,
            year: year,
            mileage: mileage
        });

        return tokenId;
    }

    function getVehicleInfo(uint256 tokenId) external view returns (VehicleInfo memory) {
        return vehicleData[tokenId];
    }
}

