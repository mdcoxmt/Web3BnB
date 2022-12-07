const {ethers} = require("hardhat")
const {expect} = require("chai")
const provider = ethers.getDefaultProvider()

describe("Mint Web3BnBStay Contract", function() {
    let Web3BnBStay, web3bnbstay;
    let owner;

    const TOKEN_URI = "DUMMY_TOKEN_URI"
    const PROPERTY_URI = "DUMMY_PROPERTY_URI"
    const nightList = "[12-6-22, 12-7-22, 12-8-22]"
    const metadata1 ="data:application/json;base64,eyJuYW1lIjoiWW91ciBCb29raW5nIiwgImRlc2NyaXB0aW9uIjogIkRVTU1ZX1BST1BFUlRZX1VSSSIsICJhdHRyaWJ1dGVzIjogWzEyLTYtMjIsIDEyLTctMjIsIDEyLTgtMjJdLCAiaW1hZ2UiOiJQSE4yWnlCM2FXUjBhRDBpTlRFeWNIZ2lJR2hsYVdkb2REMGlOVEV5Y0hnaUlIWnBaWGRDYjNnOUlqQWdNQ0ExTVRJZ05URXlJaUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lQZ29nSUR4MGFYUnNaVDVwYjI1cFkyOXVjeTEyTlMxblBDOTBhWFJzWlQ0S0lDQThjR0YwYUNCa1BTSk5ORE15TERJek1DNDNZVGM1TGpRMExEYzVMalEwTERBc01Dd3dMVE15TFRZdU4wZ3hNVEpoTnprdU5URXNOemt1TlRFc01Dd3dMREF0TXpJc05pNDJPV2d3UVRnd0xqQTVMRGd3TGpBNUxEQXNNQ3d3TERNeUxETXdORlkwTVRaaE1UWXNNVFlzTUN3d0xEQXNNeklzTUhZdE9HRTRMakVzT0M0eExEQXNNQ3d4TERndE9FZzBOREJoT0M0eExEZ3VNU3d3TERBc01TdzRMRGgyT0dFeE5pd3hOaXd3TERBc01Dd3pNaXd3VmpNd05FRTRNQzR3T1N3NE1DNHdPU3d3TERBc01DdzBNeklzTWpNd0xqZGFJaTgrQ2lBZ1BIQmhkR2dnWkQwaVRUTTNOaXc0TUVneE16WmhOVFlzTlRZc01Dd3dMREF0TlRZc05UWjJOekpoTkN3MExEQXNNQ3d3TERVdU1URXNNeTQ0TkVFNU5TNDFMRGsxTGpVc01Dd3dMREVzTVRFeUxESXdPR2cwTGpJellUUXNOQ3d3TERBc01DdzBMVE11TlRWQk16SXNNeklzTUN3d0xERXNNVFV5TERFM05tZzFObUV6TWl3ek1pd3dMREFzTVN3ek1TNDRMREk0TGpRMUxEUXNOQ3d3TERBc01DdzBMRE11TlRWb01qUXVORFpoTkN3MExEQXNNQ3d3TERRdE15NDFOVUV6TWl3ek1pd3dMREFzTVN3ek1EUXNNVGMyYURVMllUTXlMRE15TERBc01Dd3hMRE14TGpnc01qZ3VORFVzTkN3MExEQXNNQ3d3TERRc015NDFOVWcwTURCaE9UVXVOVEVzT1RVdU5URXNNQ3d3TERFc01qWXVPRGtzTXk0NE5VRTBMRFFzTUN3d0xEQXNORE15TERJd09GWXhNelpCTlRZc05UWXNNQ3d3TERBc016YzJMRGd3V2lJdlBnbzhMM04yWno0PSJ9"
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
           // await expect(web3bnbstay.tokenURI(1)).string - need to finish and add string as expected value
            console.log
        })
    })
   

})