import React , {Component} from 'react';
import { Form , Label , Dimmer , Message , Loader , Grid , Button , Step , Input , Icon , Divider ,Select ,Checkbox ,TextArea} from 'semantic-ui-react';
import factory from '../../factory';
import web3 from '../../web3';
import {Router} from '../../routes';
const options = [
  { key: 'm', text: 'Arts', value: 'Arts' },
  { key: 'f', text: 'Design & Tech', value: 'Design & Tech' },
]


export default class NewCampaginForm extends Component{

    constructor(){
        super();
        this.state = { 
            index : 0 , 
            campaginName : '',
            category : '',
            aboutCampaign : '',
            expectedBudget : '',
            walletAddress : '',
            minimumDonation : '',
            author : '',
            image : '',
            info : '',
            errorMessage : [],
            loading : false
         }
    }

    async componentDidMount(){
        let account = await web3.eth.getAccounts(); 
        this.setState({walletAddress : account,author : 'Alireza Shahabi'});
    }

    async increaseIndex() {
        let account = await web3.eth.getAccounts();
        let newIndex = this.state.index;
        const {
            campaginName,
            category,
            aboutCampaign,
            expectedBudget,
            walletAddress,
            minimumDonation,
            author,
            image,
            info
        } = this.state;
        this.setState({errorMessage : []})
        if(newIndex == 0){
            if(campaginName.length > 0 && category.length > 0 && author.length > 0 ){
                newIndex = newIndex + 1;
                this.setState({index : newIndex})
            }
            else {
                let errors = [];
                if(!campaginName.length > 0)
                errors.push('plz enter a campaign name');
                if(!category.length > 0)
                errors.push('plz choose a category for your project');

                this.setState({errorMessage : errors});
            }
        }
        else if(newIndex == 1){
            if(aboutCampaign.length > 0 && info.length > 0 && expectedBudget.length > 0 && !isNaN(expectedBudget) && image.length > 0){
                newIndex = newIndex + 1;
                this.setState({index : newIndex})
            }
            else {
                let errors = [];
                if(!aboutCampaign.length > 0)
                    errors.push('plz enter somthing about your campaign');
                if(!expectedBudget.length > 0)
                    errors.push('plz enter your dreamy budget');
                if(!image.length > 0)
                    errors.push('plz enter an image url');
                if(!info.length > 0)
                    errors.push('plz enter a single line about your project')               

                this.setState({errorMessage : errors});
            }
        }
        else if(newIndex == 2){
            let errors = [];
            if(walletAddress && minimumDonation.length > 0 && !isNaN(minimumDonation)){
                //fetch data and just redirect it to the home page
                try {
                    this.setState({loading : true});
                    let min = await web3.utils.toWei(minimumDonation,'ether');
                    let expect = await web3.utils.toWei(expectedBudget,'ether');

                    await factory.methods.createCampaign(min)
                    .send({
                        from : account[0]
                    });
                    
                    let campAddress = await factory.methods.tempAddress().call();

                    await fetch('http://localhost:8000/new/campaign', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name : campaginName,
                            author : author,
                            category : category,
                            campaignAddress : campAddress,
                            manager : walletAddress[0],
                            info : info,
                            image : image,
                            budget : expect,
                            minimum : min,
                            description : aboutCampaign
                        })
                    });

                    this.setState({loading : false});                    
                    Router.push('/');
                    
                } catch(err){
                    errors.push(err.message.slice(0,80) + '.');
                    this.setState({errorMessage : errors});
                }
                this.setState({loading : false});
            }
            else {
                errors.push('plz enter a minimum donation amount');
                this.setState({errorMessage : errors});
            }
        }
        else{
            return;
        }
    }

    decreaseIndex(){
        let newIndex = this.state.index;
        newIndex = newIndex - 1;
        this.setState({index : newIndex})
    }

    render(){
        if(this.state.index == 0)
        return(
            <div>
                <Step.Group style={{borderRadius : 1.5}} fluid ordered stackable='tablet'>
                    <Step active>
                    {/* <Icon name='truck' /> */}
                        <Step.Content>
                            <Step.Title>General information</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                    {/* <Icon name='payment' /> */}
                        <Step.Content>
                            <Step.Title>About Campagin</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                    {/* <Icon name='info' /> */}
                        <Step.Content>
                            <Step.Title>Submit Campagin</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <div className="generalInfoForm">
                <h2>General information</h2>
                {/* <hr/> */}
                <Divider/>
                {this.state.errorMessage.length > 0 ? <Message
                    error
                    header='There was some errors with your submission'
                    list={this.state.errorMessage}
                /> : <div></div> }
                <Form error>
                    <Form.Field>
                        <label>Author Name</label>
                        <input disabled value={this.state.author}  placeholder='Campagin Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Campagin Name</label>
                        <input value={this.state.campaginName} onChange={event => {this.setState({campaginName : event.target.value})}} placeholder='Campagin Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Category</label>
                        <Select placeholder='Select your category' value={this.state.category} onChange={ (event , { value }) => {this.setState({category : value})}} options={options} />
                    </Form.Field>
                    {/* <Button type='submit'>Submit</Button> */}
                    <Button onClick={this.increaseIndex = this.increaseIndex.bind(this)} floated="right" style={{borderRadius : 2,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)',color : '#fff',backgroundColor : '#416DEA'}}>Next</Button>
                    <br/><br/>
                </Form>
                </div>
            </div>
        )
        if(this.state.index == 1){
            return(
                <div>
                <Step.Group style={{borderRadius : 1.5}} fluid ordered stackable='tablet'>
                    <Step completed>
                    {/* <Icon name='truck' /> */}
                        <Step.Content>
                            <Step.Title>General information</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step active>
                    {/* <Icon name='payment' /> */}
                        <Step.Content>
                            <Step.Title>About Campagin</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                    {/* <Icon name='info' /> */}
                        <Step.Content>
                            <Step.Title>Submit Campagin</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <div className="AboutCampagin">
                    <h2>About Campagin</h2>
                    {/* <hr/> */}
                    <Divider/>
                    {this.state.errorMessage.length > 0 ? <Message
                    error
                    header='There was some errors with your submission'
                    list={this.state.errorMessage}
                /> : <div></div> }
                    <Form>
                        <Form.Field>
                            <label>Write a Singel Line About Your Project</label>
                            <TextArea rows={1} value={this.state.info} onChange={(e)=>{this.setState({info : e.target.value})}} autoHeight placeholder='Try adding single lines about your campagin'/>
                        </Form.Field>
                        <Form.Field> 
                            <label>Write Any Thing You Want about your Campaign (based on the <span style={{fontSize : 15,color : "#fff",fontWeight : 'bold',padding : '2px',backgroundColor : '#252525'}}>markdown</span> type style)</label>
                            <TextArea rows={6} value={this.state.aboutCampaign} onChange={event => {this.setState({aboutCampaign : event.target.value})}} autoHeight placeholder='Try adding multiple lines in MarkDown about your campagin and your goals' />
                            <p style={{color : '#aaa'}} className="date">use this link for more info : <a target="_blank" href="http://jbt.github.io/markdown-editor/">http://jbt.github.io/markdown-editor/</a> </p>
                        </Form.Field>
                        <Form.Field>
                            <label>Your Dreamy Budget for your Campagin</label>
                            <Input labelPosition="right" label='ether' value={this.state.expectedBudget} onChange={event => {this.setState({expectedBudget : event.target.value})}} placeholder='Exp 1000 ethers' />
                        </Form.Field>
                        <Form.Field>
                            <label>Image of Your Project</label>
                            <Input  value={this.state.image} onChange={event => {this.setState({image : event.target.value})}}/>
                        </Form.Field>
                        <Button onClick={this.increaseIndex = this.increaseIndex.bind(this)} floated="right" style={{borderRadius : 2,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)',color : '#fff',backgroundColor : '#416DEA'}}>Next</Button>
                        <Button onClick={this.decreaseIndex = this.decreaseIndex.bind(this)} floated="left" style={{borderRadius : 2}}>Back</Button>
                        <br/><br/>
                    </Form>
                </div>
            </div>
            )
        }

        if(this.state.index == 2){
            return(
            <div>
                <Dimmer active={this.state.loading} style={{backgroundColor : 'rgba(65,109,234,0.5)'}} inverted>
                    <Dimmer active={this.state.loading} inverted>
                        <Loader size="huge" indeterminate>Plz Wait About 15 - 20 Seconds to Transaction will be compelete</Loader>
                    </Dimmer>    
                </Dimmer>
                <Step.Group style={{borderRadius : 1.5}} fluid ordered stackable='tablet'>
                    <Step completed>
                    {/* <Icon name='truck' /> */}
                        <Step.Content>
                            <Step.Title>General information</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step completed>
                    {/* <Icon name='payment' /> */}
                        <Step.Content>
                            <Step.Title>About Campagin</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step active>
                    {/* <Icon name='info' /> */}
                        <Step.Content>
                            <Step.Title>Submit Campagin</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <div className="generalInfoForm">
                <h2>Submit Your Campagin</h2>
                {/* <hr/> */}
                <Divider/>
                {this.state.errorMessage.length > 0 ? <Message
                    error
                    header='There was some errors with your submission'
                    list={this.state.errorMessage}
                /> : <div></div> }
                <Form>
                    <Form.Field>
                        <label>Your Wallet Address</label>
                        <input value={this.state.walletAddress} disabled placeholder='Wallet Address' />
                    </Form.Field>
                    <Form.Field>
                        <label>Your Minumum Contribution</label>
                        <Input labelPosition='right' value={this.state.minimumDonation} onChange={event => {this.setState({minimumDonation : event.target.value})}} label='ether' placeholder='Minimum Donate Budget' />
                    </Form.Field>
                    <Button onClick={this.decreaseIndex = this.decreaseIndex.bind(this)} floated="left" style={{borderRadius : 2}}>Back</Button>                    
                    <Button onClick={this.increaseIndex = this.increaseIndex.bind(this)} floated="right" style={{borderRadius : 2,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)',color : '#fff',backgroundColor : '#416DEA'}}>Done!</Button>
                    <br/><br/>
                </Form>
                </div>
            </div>
            )
        }
    }
}