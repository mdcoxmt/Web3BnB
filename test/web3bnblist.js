const {ethers} = require("hardhat")
const {expect} = require("chai")
const provider = ethers.getDefaultProvider()

describe("Mint Web3BnBListing Contract", function() {
    let Web3BnBListing, web3bnblisting;
    let owner;

    const nightPrice = 50
    const propertyAddress = "3530 Mikes Way, Missoula, MT 59803"
    const propertyDescription = "A lovely 4 bed, 3 bath home, with views of Lolo Peak and Mount Jumbo. A 10-min drive from downtown, and a 5-min drive from the Bitterroot make this a perfect stay for city-lovers and fishing enthusiasts alike!"
    beforeEach(async function() {
            Web3BnBListFactory = await ethers.getContractFactory("Web3BnBListing");
            [owner, hodler1, hodler2] = await ethers.getSigners();
            web3bnblisting = await Web3BnBListFactory.deploy();
    })

    describe("Deployment", function() {
        it("Should have correct owner", async function(){
            expect(await web3bnblisting.owner()).to.equal(owner.address);
        })

        it("Caller should have correct LIST balance after minting", async function() {
            const initialStayBalance = await web3bnblisting.balanceOf(hodler1.address)
            expect(initialStayBalance.toString()).to.equal("0");
            
            await web3bnblisting.connect(hodler1).mintListing(nightPrice, propertyAddress, propertyDescription);

            const finalBalance = await web3bnblisting.balanceOf(hodler1.address)
            expect(finalBalance.toString()).to.equal("1");
        })
    })
   

})