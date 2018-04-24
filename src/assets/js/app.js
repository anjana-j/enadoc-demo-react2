/*  ethereum goodies */
import web3 from '../../../ethereum/modules/web3';
import factory from '../../../ethereum/modules/factory';
import Contract from '../../../ethereum/modules/contract';

/* react core */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/* semantic UI */
import { Button, Grid, Card, Container, Form, Input, Message, TextArea } from 'semantic-ui-react';

/* stylesheet */
import "../scss/app.scss";


// async function GetDeployed  {
//   const DeployedHashes = await factory.methods.getDeployedHashes().call();
//   console.log(DeployedHashes);
//   console.log(DeployedHashes.length);
// }


// GetDeployed();

class EnadocHashDemo extends Component {

  state = {
    docID       : '',
    hashValue   : '',
    loading     : false,
    errorMessage: '',
    DeployedHashes : []
  }


  async componentDidMount() {
    const DeployedHashes = await factory.methods.getDeployedHashes().call();
    this.setState({ DeployedHashes });
  }

  renderCampaigns() {
    const items = this.state.DeployedHashes.map(address => {
        return {
            header : address, 
            fluid : true
        };
    });

    return <Card.Group items={items} />
  }

  onSubmit = async (event) => {

    event.preventDefault();

    
    /* Create Instance */
    /* Get Deployed Hash */
    /* Create Contract using Deployed Hash */
    /* Store DocID and Hash Value */

    const { docID, hashValue } = this.state;
    this.setState({ loading: true, errorMessage: '' });

    try {

      /* Get Web3 Account */
      const accounts = await web3.eth.getAccounts();

      /* Create Instance */
      await factory.methods.createInstance().send({ from: accounts[0] });

      /* Get Deployed Hash */
      const instanceAddresses = await factory.methods.getDeployedHashes().call();
      const lastInstanceAddress = instanceAddresses[instanceAddresses.length - 1];

      /* Create Contract using Deployed Hash */
      const contract = Contract(lastInstanceAddress);
      //await contract.methods.EnadocHashStore(lastInstanceAddress).send({ from: accounts[0]});

      /* Store DocID and Hash Value */
      await contract.methods.createRequest(docID, hashValue, accounts[0]).send({ from: accounts[0]});


    } catch(err) {
      this.setState({ errorMessage: err.message });

    }

    this.setState({ loading: false });
    alert("Hash stored in the BlockChain Successfully !");

  }


  render() {
    return (

      <Container>
        <h1>Enadoc - BlockChain Demo</h1>

        <Grid columns={2}>
  
            <Grid.Column>
              <h2>Hashes Already Added</h2>
              {this.renderCampaigns()}
            </Grid.Column>


            <Grid.Column>

              <h2>Add a Document Hash</h2>

              <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Document ID</label>
                    <Input 
                      value={this.state.docID}
                      onChange={ event => this.setState({ docID : event.target.value })}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Hash Value</label>
                    <TextArea
                      value={this.state.hashValue}
                      onChange={ event => this.setState({ hashValue : event.target.value })}
                    />
                </Form.Field>

                <Message 
                  error 
                  header="Oops!" 
                  content={this.state.errorMessage} 
                />

                <Button primary loading={this.state.loading}>
                    Save Hash
                </Button>

              </Form>

            </Grid.Column>
        </Grid>
      </Container>

    )
  };
}

export default EnadocHashDemo;

ReactDOM.render(<EnadocHashDemo />, document.getElementById('root'));
