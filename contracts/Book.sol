// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./base64.sol";
import "../node_modules/hardhat/console.sol";
import "./Web3BnBStay.sol";
import "@openzeppelin/contracts/utils/Strings.sol";



contract Book {

    struct datesBooked{
        uint256 dates;
    }

    mapping (string => datesBooked) public calendar;

    function book(string calldata propertyURI, string calldata price, uint256 date) public payable returns (string memory){
        
        require(calendar[propertyURI].dates != date);
        uint256 _price = stringToUint(price);
        if(msg.value >= _price){
        { 
           //Web3BnBStay.mintStay(propertyURI, price, date);
           calendar[propertyURI].dates = date;
           return("You successfully booked your Web3BnB!");
        }
        }
    }

    function stringToUint(string memory s) public pure returns (uint) {
        bytes memory b = bytes(s);
        uint result = 0;
        for (uint256 i = 0; i < b.length; i++) {
            uint256 c = uint256(uint8(b[i]));
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
        return result;
    }
}

