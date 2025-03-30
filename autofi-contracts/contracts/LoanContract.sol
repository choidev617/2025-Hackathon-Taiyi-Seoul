import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./VehicleNFT.sol";

/// @title LoanContract - NFT 담보 대출 계약
contract LoanContract is Ownable {
    IERC20 public stablecoin;
    VehicleNFT public vehicleNFT;

    struct Loan {
        address borrower;
        uint256 tokenId;
        uint256 amount;
        uint256 interest;
        uint256 dueDate;
        bool repaid;
    }

    uint256 public loanIdCounter;
    mapping(uint256 => Loan) public loans;
    mapping(uint256 => bool) public nftLocked;

    constructor(address _stablecoin, address _vehicleNFT) Ownable(msg.sender) {
        stablecoin = IERC20(_stablecoin);
        vehicleNFT = VehicleNFT(_vehicleNFT);
    }

    function requestLoan(
        uint256 tokenId,
        uint256 amount,
        uint256 interest,
        uint256 duration
    ) external {
        require(vehicleNFT.ownerOf(tokenId) == msg.sender, "Not owner");
        require(!nftLocked[tokenId], "Already locked");

        vehicleNFT.transferFrom(msg.sender, address(this), tokenId);
        nftLocked[tokenId] = true;

        uint256 loanId = loanIdCounter++;
        loans[loanId] = Loan({
            borrower: msg.sender,
            tokenId: tokenId,
            amount: amount,
            interest: interest,
            dueDate: block.timestamp + duration,
            repaid: false
        });

        require(stablecoin.transfer(msg.sender, amount), "Transfer failed");
    }

    function repayLoan(uint256 loanId) external {
        Loan storage loan = loans[loanId];
        require(msg.sender == loan.borrower, "Not borrower");
        require(!loan.repaid, "Already repaid");

        uint256 totalRepayment = loan.amount + loan.interest;
        require(stablecoin.transferFrom(msg.sender, address(this), totalRepayment), "Payment failed");

        vehicleNFT.transferFrom(address(this), msg.sender, loan.tokenId);
        loan.repaid = true;
        nftLocked[loan.tokenId] = false;
    }
}