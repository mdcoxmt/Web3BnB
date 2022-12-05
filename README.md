# Web3BnB
This is Web3BnB, a Hardhat/Solidity/Web3 project for the ETHDenver x EncodeClub bootcamp.

It's a Booking Marketplace.
- NFT Collection mapped to Listing Database w/ metadata around Dates
- NFT Fields: Location, Listening Owner (minter), Date (1-365)

## Functionality / User Stories
1. Calendar Booking
- Select Dates
- Mint/Book
- Refunds (STRETCH)
2. Create Listing
- Image
- Address
- Beds?
- Other Amenities
- Available Dates
- Door Code? (STRETCH)
3. Retrieve by City
- Print listings by city

## Developer Instructions

### Contract
To run locally on your machine:
`npx hardhat node`

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
### Front-End
Please see `/front_end` for more information