import "@openzeppelin/contracts/access/Ownable.sol";
import "./VehicleNFT.sol";

/// @title InsuranceRegistry - 차량 보험 관리
contract InsuranceRegistry is Ownable {
    struct InsuranceInfo {
        bool active;
        uint256 expiry;
        address insurer;
    }

    mapping(uint256 => InsuranceInfo) public insuranceData;
    VehicleNFT public vehicleNFT;

    constructor(address _vehicleNFT) Ownable(msg.sender) {
        vehicleNFT = VehicleNFT(_vehicleNFT);
    }

    function registerInsurance(uint256 tokenId, uint256 duration) external {
        require(vehicleNFT.ownerOf(tokenId) == msg.sender, "Not owner");

        insuranceData[tokenId] = InsuranceInfo({
            active: true,
            expiry: block.timestamp + duration,
            insurer: msg.sender
        });
    }

    function isInsured(uint256 tokenId) external view returns (bool) {
        InsuranceInfo memory info = insuranceData[tokenId];
        return info.active && info.expiry > block.timestamp;
    }
}