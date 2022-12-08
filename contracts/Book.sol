pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./base64.sol";
import "../node_modules/hardhat/console.sol";
import "./Web3BnBStay.sol";


contract Book {
    struct datesBooked{
        uint256 dates;
    }
    mapping (string => datesBooked) public calendar;
    function book(string calldata propertyURI, uint256 price, uint256 date) public payable {
        require(calendar[propertyURI].dates == date);
        if(msg.value >= price){
        { 
           // Web3BnBStay.mintStay(propertyURI, price, date); - runs the mintStay function, need to deploy and plug in address
           calendar[propertyURI].dates = date;
        }
        }
      
        
    }

    
}

