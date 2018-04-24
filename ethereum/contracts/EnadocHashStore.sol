pragma solidity ^0.4.17;

/* Factory Contract for use same contract for store Enadoc Hashes */
contract EnadocHashStoreFactory {

    /* Factory Variables */
    address[] public storedHashValues;

    /* Create an Instance using EnadocHashStore Constructor */
    function createInstance() public {
        address newHashRequest = new EnadocHashStore(msg.sender);
        storedHashValues.push(newHashRequest);
    }

    /* Get stored Hash Contracts */
    function getDeployedHashes() public view returns (address[]) {
        return storedHashValues;
    }

}


/* Main Contract */
contract EnadocHashStore {

    /* struct values for Request */
    struct RequestStruct {
        uint32 docID;
        string hashValue;
        address author;
    }

    /* Contract Variables */
    RequestStruct[] public hashRequests;
    address public enadocAuthor;

    /* Restricting for Main User to store hashes in BlockChain */
    modifier restried() {
        require(msg.sender == enadocAuthor);
        _;
    }

    /* Constructor Function for EnadocHashStore */
    function EnadocHashStore(address creater) public {
        enadocAuthor = creater;
    }

    /* Function for Create the Hash Store */
    function createRequest(uint32 docID, string hashValue, address author) public {
        RequestStruct memory newRequest = RequestStruct({
            docID : docID,
            hashValue : hashValue,
            author : author
        });

        hashRequests.push(newRequest);
    }

    /* Get sumamry of stored Hash Values */
    function getHashSummary() public view returns(uint, address) {
        return(hashRequests.length, enadocAuthor);
    }

    /* Get How may hashes stored in BlockChain */
    function getStoredHashCount() public view returns(uint) {
        return  hashRequests.length;
    }
}