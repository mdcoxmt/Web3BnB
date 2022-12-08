// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Web3BnBStay.sol";
import "./Web3BnBListing.sol";


contract Exchange {

	struct _Bid {
		address bidder;
		uint256 amt;
	}

	mapping(uint256 => _Bid) public bids;


	function placeBid(uint256 _tokenID, uint256 _amt) public payable {
		require(msg.value = _amt);
		bids[_tokenID] = _Bid(msg.sender, _amt);
	}

	function acceptBid(uint256 _tokenID) public {
		require(msg.sender.ownerOf(Web3BnBStay(_tokenID)));
		// might need to have owner of the stay deposit token to exchange first
	}


}