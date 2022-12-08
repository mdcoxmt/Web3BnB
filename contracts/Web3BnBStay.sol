// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./base64.sol";
import "../node_modules/hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract Web3BnBStay is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    constructor() ERC721("Web3BnBStay", "STAY"){}

     struct datesBooked{
        uint256 dates;
    }

    mapping (string => datesBooked) public calendar;

    string logoEncoded = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDx0aXRsZT5pb25pY29ucy12NS1nPC90aXRsZT4KICA8cGF0aCBkPSJNNDMyLDIzMC43YTc5LjQ0LDc5LjQ0LDAsMCwwLTMyLTYuN0gxMTJhNzkuNTEsNzkuNTEsMCwwLDAtMzIsNi42OWgwQTgwLjA5LDgwLjA5LDAsMCwwLDMyLDMwNFY0MTZhMTYsMTYsMCwwLDAsMzIsMHYtOGE4LjEsOC4xLDAsMCwxLDgtOEg0NDBhOC4xLDguMSwwLDAsMSw4LDh2OGExNiwxNiwwLDAsMCwzMiwwVjMwNEE4MC4wOSw4MC4wOSwwLDAsMCw0MzIsMjMwLjdaIi8+CiAgPHBhdGggZD0iTTM3Niw4MEgxMzZhNTYsNTYsMCwwLDAtNTYsNTZ2NzJhNCw0LDAsMCwwLDUuMTEsMy44NEE5NS41LDk1LjUsMCwwLDEsMTEyLDIwOGg0LjIzYTQsNCwwLDAsMCw0LTMuNTVBMzIsMzIsMCwwLDEsMTUyLDE3Nmg1NmEzMiwzMiwwLDAsMSwzMS44LDI4LjQ1LDQsNCwwLDAsMCw0LDMuNTVoMjQuNDZhNCw0LDAsMCwwLDQtMy41NUEzMiwzMiwwLDAsMSwzMDQsMTc2aDU2YTMyLDMyLDAsMCwxLDMxLjgsMjguNDUsNCw0LDAsMCwwLDQsMy41NUg0MDBhOTUuNTEsOTUuNTEsMCwwLDEsMjYuODksMy44NUE0LDQsMCwwLDAsNDMyLDIwOFYxMzZBNTYsNTYsMCwwLDAsMzc2LDgwWiIvPgo8L3N2Zz4=";

    function mintStay(string calldata propertyURI, uint256 nightlyPrice, string memory stayDate) public payable{
       
       //uint256 totalPrice = nightlyPrice * dateCount;
       require (msg.value >= nightlyPrice, "You don't have enough funds to book this date");
        // Set the latest Id for the NFT minted here. 
        uint256 newItemId = _tokenIds.current();
        // Associate the address of the NFT owner with the id of the NFT
        _mint(msg.sender, newItemId);
        // Associate the NFT URI with the Id, and format the metadata
        _setTokenURI(newItemId, formatTokenURI(logoEncoded, "Your Booking", propertyURI, stayDate));
        console.log("TokenURI is", tokenURI(newItemId));
        _tokenIds.increment();
    }

    function book(string calldata propertyURI, string calldata price, uint256 date) public payable returns (string memory){
        
        require(calendar[propertyURI].dates != date);
        uint256 _price = stringToUint(price);
        if(msg.value >= _price){
        { 
           string memory _date = Strings.toString(date);
           mintStay(propertyURI, _price, _date);
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


    //a function from the internet that packages the metadata for an NFT within a function
    function formatTokenURI(string memory _imageURI, string memory _name, string memory _description, string memory _properties) public pure returns (string memory) {
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                             // name of NFT, "Your Booking"
                            '{"name":"', _name,
                             // propertyURI, URI of the associated ListingNFT
                            '", "description": "', _description, '"',
                            // date booked
                            ', "attributes": ', _properties,
                             // standard Web3BnB logo, wherever that URI is
                            ', "image":"', _imageURI, '"}'
                        )
                    )
                )
            )
        );
    }


function svgToImageURI(string memory _source) public pure returns (string memory) {
    string memory baseURL = "data:image/svg+xml;base64,";
    string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(_source))));
    return string(abi.encodePacked(baseURL, svgBase64Encoded));
}

}