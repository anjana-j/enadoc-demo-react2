const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const contractName = 'EnadocHashStore.sol';

// delete the build folder
const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

// get path for contract and read it
const contractPath = path.resolve(__dirname, 'contracts',contractName);
const source = fs.readFileSync(contractPath, 'utf8');

// output it
const output = solc.compile(source,1).contracts;

// create the build folder
fs.ensureDirSync(buildPath);

for(let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':','') + '.json'),
        output[contract]
    );
}
