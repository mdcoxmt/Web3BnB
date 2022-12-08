const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Web3BnBListing', () => {
	let token

	beforeEach(async () => {
		const Token = await ethers.getContractFactory('Web3BnBListing')
		token = await Token.deploy()

		accounts = await ethers.getSigners()
		deployer = accounts[0]
		user1 = accounts[1]
	})

	describe('Basics', async() =>{

		beforeEach(async()=> {
		transaction = await token.mint(deployer.address, 1, {value: ethers.utils.parseEther("1.0")})
		result = await transaction.wait()

		})

		it('mints tokens', async () =>{
			expect(await token.balanceOf(deployer.address)).to.equal('1')
		})
	})
})