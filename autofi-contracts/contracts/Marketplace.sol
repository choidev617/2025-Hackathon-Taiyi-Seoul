import "@openzeppelin/contracts/access/Ownable.sol";
import "./VehicleNFT.sol";

/// @title Marketplace - 차량 NFT 거래
contract Marketplace is Ownable {
    VehicleNFT public vehicleNFT;

    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(uint256 => Listing) public listings;

    constructor(address _vehicleNFT) Ownable(msg.sender) {
        vehicleNFT = VehicleNFT(_vehicleNFT);
    }

    function listNFT(uint256 tokenId, uint256 price) external {
        require(vehicleNFT.ownerOf(tokenId) == msg.sender, "Not owner");

        vehicleNFT.transferFrom(msg.sender, address(this), tokenId);
        listings[tokenId] = Listing(msg.sender, price);
    }

    function buyNFT(uint256 tokenId) external payable {
        Listing memory listing = listings[tokenId];
        require(msg.value == listing.price, "Wrong payment");

        delete listings[tokenId];
        payable(listing.seller).transfer(msg.value);
        vehicleNFT.transferFrom(address(this), msg.sender, tokenId);
    }
}