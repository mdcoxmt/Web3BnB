const { expect } = require('chai');
const { ethers } = require("hardhat")

const { task } = require("hardhat/config");


task("deploy", "Deploys the Web3BnBStay.sol contract").setAction(async function (taskArguments, hre) {
    const nftContractFactory = await hre.ethers.getContractFactory("Web3BnB", getAccount());
    const web3bnb = await nftContractFactory.deploy();
    console.log(`Contract deployed to address: ${web3bnb.address}`);
});