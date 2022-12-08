// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Web3BnBListing is ERC721, Ownable{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

	constructor() ERC721("Web3BnBListing", "LIST"){

	}

	function mint(address to, uint256 tokenId) public payable{
		require(msg.value >= 1 ether);
		_mint(to, tokenId);

	}

}