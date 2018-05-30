const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname,'contracts','newCampaign.sol');
console.log(contractPath);
const contractFile = fs.readFileSync(contractPath,'utf-8');
console.log(contractFile);

const outPut = solc.compile(contractFile,1).contracts;

console.log(outPut);

fs.ensureDirSync(buildPath);
for(let contract in outPut) {
    fs.outputJsonSync(
        path.resolve(buildPath,contract.slice(1) + '.json'),
        outPut[contract]
    );
}




