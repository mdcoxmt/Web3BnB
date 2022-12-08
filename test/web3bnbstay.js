const {ethers} = require("hardhat")
const {expect} = require("chai")
const provider = ethers.getDefaultProvider()

describe("Mint Web3BnBStay Contract", function() {
    let Web3BnBStay, web3bnbstay;
    let owner;

    const TOKEN_URI = "DUMMY_TOKEN_URI"
    const PROPERTY_URI = "DUMMY_PROPERTY_URI"
    const stayDate = "1262022"
    const metadata1 = "data:application/json;base64,eyJuYW1lIjoiWW91ciBCb29raW5nIiwgImRlc2NyaXB0aW9uIjogIkRVTU1ZX1BST1BFUlRZX1VSSSIsICJhdHRyaWJ1dGVzIjogMTI2MjAyMiwgImltYWdlIjoiUEhOMlp5QjNhV1IwYUQwaU5URXljSGdpSUdobGFXZG9kRDBpTlRFeWNIZ2lJSFpwWlhkQ2IzZzlJakFnTUNBMU1USWdOVEV5SWlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpUGdvZ0lEeDBhWFJzWlQ1cGIyNXBZMjl1Y3kxMk5TMW5QQzkwYVhSc1pUNEtJQ0E4Y0dGMGFDQmtQU0pOTkRNeUxESXpNQzQzWVRjNUxqUTBMRGM1TGpRMExEQXNNQ3d3TFRNeUxUWXVOMGd4TVRKaE56a3VOVEVzTnprdU5URXNNQ3d3TERBdE16SXNOaTQyT1dnd1FUZ3dMakE1TERnd0xqQTVMREFzTUN3d0xETXlMRE13TkZZME1UWmhNVFlzTVRZc01Dd3dMREFzTXpJc01IWXRPR0U0TGpFc09DNHhMREFzTUN3eExEZ3RPRWcwTkRCaE9DNHhMRGd1TVN3d0xEQXNNU3c0TERoMk9HRXhOaXd4Tml3d0xEQXNNQ3d6TWl3d1ZqTXdORUU0TUM0d09TdzRNQzR3T1N3d0xEQXNNQ3cwTXpJc01qTXdMamRhSWk4K0NpQWdQSEJoZEdnZ1pEMGlUVE0zTml3NE1FZ3hNelpoTlRZc05UWXNNQ3d3TERBdE5UWXNOVFoyTnpKaE5DdzBMREFzTUN3d0xEVXVNVEVzTXk0NE5FRTVOUzQxTERrMUxqVXNNQ3d3TERFc01URXlMREl3T0dnMExqSXpZVFFzTkN3d0xEQXNNQ3cwTFRNdU5UVkJNeklzTXpJc01Dd3dMREVzTVRVeUxERTNObWcxTm1Fek1pd3pNaXd3TERBc01Td3pNUzQ0TERJNExqUTFMRFFzTkN3d0xEQXNNQ3cwTERNdU5UVm9NalF1TkRaaE5DdzBMREFzTUN3d0xEUXRNeTQxTlVFek1pd3pNaXd3TERBc01Td3pNRFFzTVRjMmFEVTJZVE15TERNeUxEQXNNQ3d4TERNeExqZ3NNamd1TkRVc05DdzBMREFzTUN3d0xEUXNNeTQxTlVnME1EQmhPVFV1TlRFc09UVXVOVEVzTUN3d0xERXNNall1T0Rrc015NDROVUUwTERRc01Dd3dMREFzTkRNeUxESXdPRll4TXpaQk5UWXNOVFlzTUN3d0xEQXNNemMyTERnd1dpSXZQZ284TDNOMlp6ND0ifQ==";
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
            
            await web3bnbstay.connect(hodler1).mintStay(PROPERTY_URI, 2, stayDate, {value:"10"});

            const finalBalance = await web3bnbstay.balanceOf(hodler1.address)
            expect(finalBalance.toString()).to.equal("1");
        })

        it("Should reject mintStay if caller's msg.value too low", async function(){
            await expect(web3bnbstay.connect(hodler2).mintStay(PROPERTY_URI, 100, stayDate, {value: "9999"})).to.be.revertedWith("You don't have enough funds to book this date")
        })

        it("Should pass correct metadata into tokenURI", async function(){
            await web3bnbstay.connect(hodler1).mintStay(PROPERTY_URI, 2, stayDate, {value:"10"});
            await expect(web3bnbstay.tokenURI(1)).to.equal(metadata1)
        })
    })
   

})