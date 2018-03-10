import React , {Component} from 'react';
import marked from 'marked';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {Link , Router} from '../../routes';
import Campaign from '../../campaign';
import web3 from '../../web3';
import {Divider, Grid, Container, Card, Icon, Image, Button, Input , Label , Progress,TextArea,Form } from 'semantic-ui-react';

export default class Show extends Component{
    constructor(){
        super();
        this.state = {
            loading : false,
            inputValue : '',
            loadingInput : false
        }
    }

    async DonationButton(amount){
        this.setState({loading : true});
        console.log(this.props.address)
        const campagin = await Campaign(this.props.address);
        let Amount = await web3.utils.toWei(amount,'ether');
        let accounts = await web3.eth.getAccounts();
        await campagin.methods.contribute().send({
            from : accounts[0],
            value : Amount
        });
        this.setState({loading : false});
        Router.push(`/campaigns/show/${this.props.address}`)

    }

    async DonationInput(amount){
        console.log(amount);
        let Amount = await web3.utils.toWei(amount,'ether');
        if(Amount < this.props.minimumContribution){
            alert("plz enter a value more than minimin contribution!!!");

        }
        else{
            const campagin = await Campaign(this.props.address);
            let accounts = await web3.eth.getAccounts();
            await campagin.methods.contribute().send({
                from : accounts[0],
                value : Amount
            });
            this.setState({loadingInput : true});
            Router.push(`/campaigns/show/${this.props.address}`)
        }
    }

    static async  getInitialProps(props){
        const campagin = Campaign(props.query.address);
        const summary = await campagin.methods.getSummary().call();
        return { 
            address : props.query.address,
            minimumContribution : summary[0],
            dreamyBudget : summary[1],
            amountRaised : summary[2],
            manager : summary[4],
            approversCount : summary[3],
            campaignName : summary[5],
            author : summary[6],
            image : summary[7],
            aboutCampaign : summary[8],
            category : summary[9]
         };
    }

    render(){
        return(
            <div style={{backgroundColor:'rgba(65,109,234,1)'}}>
                <Navbar/>
                <div className="campaignHeader">
                    <Container style={{padding : '10px'}}>
                        <Grid stackable>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <h1 style={{fontSize : 35}}>
                                    <span style={{backgroundColor : '#fff',padding : '5px',boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                                        {this.props.campaignName}
                                    </span>
                                    </h1>
                                    <h4 style={{color : '#252525'}}>
                                    <span style={{backgroundColor : '#fff',padding : '5px',boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                                        Taking inspiration from a surgeon's scalpel we've created a handmade steak knife like no other.
                                    </span>
                                    </h4>
                                    <div style={{marginTop : '25px'}}>
                                        <a href="#">
                                            <span style={{backgroundColor : '#fff',padding : '15px',boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.1)'}}>
                                                <Image src='https://placeholdit.co//i/580x580?bg=eeeeee' avatar size="mini"/>
                                                <span style={{marginLeft : '5px'}}>
                                                    <span style={{fontWeight : 'bold',fontSize : 15}}>{this.props.author}</span>
                                                </span>
                                            </span>
                                            <br/>
                                        </a>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <div style={{backgroundColor : '#fff',marginTop : '20px',padding : '20px'}}>
                            <Grid stackable>
                                <Grid.Row columns={2}>
                                    <Grid.Column width={9}>
                                        <div style={{textAlign : 'center',margin : 0}}>
                                            <Image centered size="massive" src={this.props.image} />
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={7}>
                                    <Card fluid style={{borderRadius : 1.5,boxShadow : 'none'}}>
                                        <Card.Content>
                                            <div>
                                                <Progress style={{borderRadius : 1.5,marginBottom : '15px'}} color="blue" size="tiny" percent={(this.props.amountRaised / this.props.dreamyBudget) * 100} />
                                                <span style={{fontSize : 30,color : 'rgba(65,109,234,0.9)'}}>{web3.utils.fromWei(this.props.amountRaised,'ether')} ETH</span><br/>
                                                <span style={{color : '#aaa',fontWeight : '200',fontSize : 16}}>pledged of <span>{web3.utils.fromWei(this.props.dreamyBudget,'ether')} ETH</span> goal</span>
                                            </div>
                                            <br/>
                                            <div>
                                                <span style={{display : 'block',fontWeight : '600',fontSize : 18,color : 'rgba(65,109,234,0.9)'}}>{this.props.approversCount}</span>
                                                <span style={{color : '#aaa',fontWeight : '200',fontSize : 16}}>Contributers</span>
                                            </div>
                                            <br/>
                                            <div>
                                                <span style={{display : 'block',fontWeight : '600',fontSize : 18,color : 'rgba(65,109,234,0.9)'}}>15</span>
                                                <span style={{color : '#aaa',fontWeight : '200',fontSize : 16}}>Days to go</span>
                                            </div>
                                            <br/>
                                            <Card.Description>
                                                <Input fluid onChange={(e)=>{this.setState({inputValue : e.target.value})}} labelPosition='left' placeholder={`${web3.utils.fromWei(this.props.minimumContribution,'ether')}`} action>
                                                    <Label>ETH</Label>
                                                    <input disabled={this.state.loadingInput} value={this.state.inputValue} />
                                                    <Button loading={this.state.loadingInput} onClick={()=>{this.DonationInput(this.state.inputValue)}} style={{backgroundColor : '#416DEA',color : '#fff'}}>Contribute</Button>
                                                </Input>
                                            </Card.Description>
                                            <Divider/>
                                            <div>
                                                <Grid stackable>
                                                        <Grid.Row columns={2}>
                                                            <Grid.Column>
                                                                <Button style={{padding : '12px',fontSize : 15,borderRadius : 1.5}} fluid icon="heart" labelPosition="right" content="Save it!"/>
                                                            </Grid.Column>
                                                            <Grid.Column>
                                                                <div>
                                                                    <Button loading={this.state.loading} onClick={()=>{this.DonationButton(web3.utils.fromWei(this.props.minimumContribution,'ether'))}} className="item" style={{
                                                                        borderRadius : 1.5,
                                                                        color : '#fff',
                                                                        backgroundColor : '#416DEA',
                                                                        border : 'none',
                                                                        boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)',
                                                                        padding : '10px',
                                                                        width : '100%',
                                                                        display : 'block',
                                                                        textAlign : 'center',
                                                                        fontSize : 15,
                                                                        fontWeight : '600'}}>
                                                                        Donate {web3.utils.fromWei(this.props.minimumContribution,'ether')} ETH
                                                                    </Button>
                                                                </div>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                </Grid>
                                            </div>
                                            <div>
                                                <Grid stackable>
                                                    <Grid.Row columns={1}>
                                                        <Grid.Column>
                                                            <span style={{backgroundColor : '#eee',padding : '5px',margin : '5px'}}>
                                                                <Icon name="tag" />
                                                                {this.props.category}
                                                            </span>
                                                            <span style={{backgroundColor : '#eee',padding : '5px',margin : '5px'}}>
                                                                <Icon name="location arrow" />
                                                                Austin, TX
                                                            </span>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </div>
                                        </Card.Content>
                                    </Card>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <div>
                    <Container style={{padding : '10px'}}>
                        <div style={{backgroundColor : '#fff',marginTop : '20px',padding : '20px'}}>
                        <Grid stackable>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    <div dangerouslySetInnerHTML={{__html : marked(this.props.aboutCampaign)}}>
                                    </div> 
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        </div>
                        <div style={{marginTop : '10px'}}>
                            <Button content="Report Project" />
                        </div>                
                    </Container>
                </div>
                <div className="Footer" style={{marginBottom : '10px',borderColor : '#eee',borderStyle:'solid',borderWidth : 1,marginTop : '10px',marginBottom : '0',padding : '15px',backgroundColor : '#fff'}}>
                    <Container>
                        <Footer/>
                    </Container>
                </div>
            </div>
        )
    }
}