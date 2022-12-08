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

run these back-end commands in the project root before running front-end
1. `npx hardhat compile`
2. `npx hardhat node`
2. `npx hardhat run --network localhost scripts/deploy.js`

running the above ^ will make sure your `front_end/src/contracts/` is populated with the files it needs so now...
4. if you wish, cd into front_end and run this to use the front-end: 1) `npm i` 2) `npm run start` 3) visit in browser `localhost:3000`

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

this: 0xfDD2ca57Bb229ba61c1f953BdDFE82e9555B59ab


`Local BadgeToken deployed to:` 0xc61819942a3a585a4403AB5DCae37De0bc4CDef0
