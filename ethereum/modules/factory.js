import web3 from './web3';
import ContractFactory from '../build/EnadocHashStoreFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(ContractFactory.interface),
    '0xed2b79f77dC3075263A0C842910d95D674f1f4D8'
);

export default instance;