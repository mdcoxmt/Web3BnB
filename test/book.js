const {ethers} = require("hardhat")
const {expect} = require("chai")
const provider = ethers.getDefaultProvider()

describe("Mint Book Contract", function() {
    let Book, book;
    let owner;

    const PROPERTY_URI = "DUMMY_PROPERTY_URI"
    const price = "10"
    const date = 12202022
    beforeEach(async function() {
            BookFactory = await ethers.getContractFactory("Book");
            [owner, hodler1, hodler2] = await ethers.getSigners();
            book = await BookFactory.deploy();
    })

    describe("Deployment", function() {
        it("Should have correct owner", async function(){
            expect(await book.owner()).to.equal(owner.address);
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