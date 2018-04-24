const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/EnadocHashStoreFactory.json');

const provider = new HDWalletProvider(
    'rural pole book pull rack labor van column document body quit huge',
    'https://rinkeby.infura.io/P5DvcqLz06ngNGtW5VwE'
);

// const provider = new HDWalletProvider(
//     'dose author erosion beef depend exact mouse car step rocket call ten',
//     'http://127.0.0.1:7545'
// );

const web3 = new Web3(provider);

const deploy = async () => {

    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account ', accounts[0]);

    const results = await new web3.eth.Contract(
        JSON.parse(compiledFactory.interface)
    )
        .deploy({ 
            data: compiledFactory.bytecode
        })
        .send({ 
            from: accounts[0], 
            gas: '1000000'
        })

    console.log("Contract deployed to", results.options.address);
};

deploy();
