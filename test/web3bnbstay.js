const {ethers} = require("hardhat")
const {expect} = require("chai")

describe("Mint Web3BnBStay Contract", function() {
    let Web3BnBStay, web3bnbstay;
    let owner;

    const TOKEN_URI = "DUMMY_TOKEN_URI"

    beforeEach(async function() {
            Web3BnBStayFactory = await ethers.getContractFactory("Web3BnBStay");
            [owner, hodler1] = await ethers.getSigners();
            web3bnbstay = await Web3BnBStayFactory.deploy();
    })

    describe("Deployment", function() {
        it("Should have correct owner", async function(){
            expect(await web3bnbstay.owner()).to.equal(owner.address);
        })

        it("Should have correct balance after minting", async function() {
            const initialBalance = await web3bnbstay.balanceOf(hodler1.address)
            expect(initialBalance.toString()).to.equal("0");
            
            await web3bnbstay.mint(hodler1.address, TOKEN_URI);

            const finalBalance = await web3bnbstay.balanceOf(hodler1.address)
            expect(finalBalance.toString()).to.equal("1");
        })
    })
   

})