const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());


// get compiled contract files
const compiledFactory = require('../ethereum/build/EnadocHashStoreFactory.json');
const compiledContract = require('../ethereum/build/EnadocHashStore.json');

let accounts;
let factory;
let contractAddress;
let contract;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    await factory.methods.createInstance().send({
        from: accounts[0],
        gas: '1000000'
    });

    // ES2016 | const contractAddress = await.... 
    [contractAddress] = await factory.methods.getDeployedHashes().call();
    
    contract = await new web3.eth.Contract(
        JSON.parse(compiledContract.interface),
        contractAddress
    );

});


describe('Contract', () => {
    it('Deploys a Factory and a contract', () => {
        assert.ok(factory.options.address);
        assert.ok(contract.options.address);
    });

    it('marks Author as the contract creater', async () => {
        const enadocAuthor = await contract.methods.enadocAuthor().call();
        assert.equal(accounts[0], enadocAuthor);
    });


    it('Process Requests', async () => {

        await contract.methods
            .createRequest('1', 'Hello', accounts[1])
            .send({
                from : accounts[0],
                gas : '1000000'
            });

        let balance = await web3.eth.getBalance(accounts[1]);

        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);

        console.log(balance);

    });
});