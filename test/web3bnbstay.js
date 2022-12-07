const {ethers} = require("hardhat")
const {expect} = require("chai")
const provider = ethers.getDefaultProvider()

describe("Mint Web3BnBStay Contract", function() {
    let Web3BnBStay, web3bnbstay;
    let owner;

    const TOKEN_URI = "DUMMY_TOKEN_URI"
    const PROPERTY_URI = "DUMMY_PROPERTY_URI"
    const nightList = "[12-6-22, 12-7-22, 12-8-22]"

    beforeEach(async function() {
            Web3BnBStayFactory = await ethers.getContractFactory("Web3BnBStay");
            [owner, hodler1, hodler2] = await ethers.getSigners();
            web3bnbstay = await Web3BnBStayFactory.deploy();
    })

    describe("Deployment", function() {
        it("Should have correct owner", async function(){
            expect(await web3bnbstay.owner()).to.equal(owner.address);
        })

        it("Caller should have correct STAY balance after minting", async function() {
            const initialStayBalance = await web3bnbstay.balanceOf(hodler1.address)
            expect(initialStayBalance.toString()).to.equal("0");
            
            await web3bnbstay.connect(hodler1).mintStay(PROPERTY_URI, 2, 5, nightList, {value:"10"});

            const finalBalance = await web3bnbstay.balanceOf(hodler1.address)
            expect(finalBalance.toString()).to.equal("1");
        })

        it("Should reject mintStay if caller's msg.value too low", async function(){
            await expect(web3bnbstay.connect(hodler2).mintStay(PROPERTY_URI, 100, 100, nightList, {value: "9999"})).to.be.revertedWith("You don't have enough funds to book this date")
        })

        it("Should pass correct metadata into tokenURI", async function(){
            await web3bnbstay.connect(hodler1).mintStay(PROPERTY_URI, 2, 5, nightList, {value:"10"});
            await expect(web3bnbstay.tokenURI(1)).to.equal("data:application/json;base64,J3sibmFtZSI6IicsIFlvdXIgQm9va2luZywnIiwgImRlc2NyaXB0aW9uIjogIicsIERVTU1ZX1BST1BFUlRZX1VSSSwgJyInLCcsICJhdHRyaWJ1dGVzIjogJywgMTItNi0yMiwgMTItNy0yMiwgMTItOC0yMiwnLCAiaW1hZ2UiOiInLCB3ZWIzYm5iLnNob3AvbG9nby5wbmcsICcifSc=")

        })
    })
   

})