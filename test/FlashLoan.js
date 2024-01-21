const {expect} = require('chai');
const {ethers} = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseEther(n.toString());
}

const ether = tokens

describe ('FlashLoan', () => {
    let deployer, accounts, token, flashloan, flashloanReceiver

    beforeEach(async () => {
        // Setup accounts
        accounts = await ethers.getSigners()
        deployer = accounts[0]

        // Deploy contracts
        const FlashLoan = await ethers.getContractFactory('FlashLoan') // Get the ContractFactory and Signers here.
        const FlashLoanReceiver = await ethers.getContractFactory('FlashLoanReceiver') // Get the ContractFactory and Signers here.
        const Token = await ethers.getContractFactory('Token') // Get the ContractFactory and Signers here.
        
        //deploy token
        token = await Token.deploy('Nogui', 'NGI', tokens(1000000)) // Deploy the Token contract
        
        //deploy flashloan
        flashloan = await FlashLoan.deploy(token.address) // Deploy the FlashLoan contract
        
        //approve tokens to flashloan
        await token.connect(deployer).approve(flashloan.address, tokens(1000)) // Approve tokens to be spent by the flashloan contract
        
        //deposit tokens into the pool
        let transaction = await flashloan.connect(deployer).deposit(tokens(1000))
        await transaction.wait()

        //deploy flashloan receiver
        flashloanReceiver = await FlashLoanReceiver.deploy(flashloan
            
            .address) // Deploy the FlashLoanReceiver contract
    

})

    describe('Deployment', async () => {
        it('Should deploy successfully', async () => {
            expect (await token.balanceOF(flashloan.address)).to.equal(1000000)
        })
    })

    describe('Borrow', async () => {
        it('Should borrow tokens successfully', async () => {
            await flashloan.connect(deployer).borrow(tokens(100))
            expect(await token.balanceOf(flashloanReceiver.address)).to.equal(tokens(100))
        })
    })
})
        