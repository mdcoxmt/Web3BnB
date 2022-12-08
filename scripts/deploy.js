// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  const web3BnBStay = await hre.ethers.getContractFactory("Web3BnBStay");
  console.log('Deploying Web3BnBStay ERC721 token...');
  const tokenStay = await web3BnBStay.deploy();

  const web3BnBListing = await hre.ethers.getContractFactory("Web3BnBListing");
  console.log('Deploying Web3BnBListing ERC721 token...');
  const tokenListing = await web3BnBListing.deploy();

  await tokenStay.deployed();
  console.log("BadgeToken deployed to:", tokenStay.address);

  const nightPrice = 50;
  const propertyAddress = "1000 S Reserve Street, Missoula, MT 59801";
  const propertyDescription = "A lovely 4 bed, 3 bath home, with views of Lolo Peak and Mount Jumbo. A 10-min drive from downtown, and a 5-min drive from the Bitterroot River make this a perfect stay for city-lovers and fishing enthusiasts alike!";

  await tokenListing.mintListing(nightPrice, propertyAddress, propertyDescription);

  saveFrontendFiles(tokenStay);

}

function saveFrontendFiles(tokenStay) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../front_end/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Token: tokenStay.address }, undefined, 2)
  );

  const Web3BnBStay_Artifact = artifacts.readArtifactSync("Web3BnBStay");

  fs.writeFileSync(
    contractsDir + "/Web3BnBStay.json",
    JSON.stringify(Web3BnBStay_Artifact, null, 2)
  );
}





// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
