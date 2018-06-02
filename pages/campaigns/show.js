import React , {Component , Fragment} from 'react';
import marked from 'marked';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {Link , Router} from '../../routes';
import Campaign from '../../campaign';
import web3 from '../../web3';
import SaveButton from '../components/SaveButton';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import {Divider, Grid, Container, Card, Icon, Image, Button, Input , Label , Progress,TextArea,Form } from 'semantic-ui-react';

export default class Show extends Component{
    constructor(){
        super();
        this.state = {
            loading : false,
            inputValue : '',
            loadingInput : false,
            data : undefined,
            editLoading : false,
            dateInMilliSeconds : undefined,
            isManager : false,
            exp : undefined,
            info : undefined
        }
    }

    async DonationButton(amount){
        this.setState({loading : true});
        const campagin = await Campaign(this.props.address);
        let Amount = await web3.utils.toWei(amount,'ether');
        let accounts = await web3.eth.getAccounts();
        await campagin.methods.contribute().send({
            from : accounts[0],
            value : Amount
        });
        this.setState({loading : false});
        Router.replace(`/campaigns/show/${this.props.address}/${this.props.manager}`)
    }

    async DonationInput(amount){
        console.log(amount);
        this.setState({loadingInput : true})
        let Amount = await web3.utils.toWei(amount,'ether');
        if(Amount < this.props.minimumContribution){
            alert("plz enter a value more than minimin contribution!!!");
            this.setState({loadingInput : false});
        }
        else {
            const campagin = await Campaign(this.props.address);
            let accounts = await web3.eth.getAccounts();
            await campagin.methods.contribute().send({
                from : accounts[0],
                value : Amount
            });
            this.setState({loadingInput : false});
            Router.replace(`/campaigns/show/${this.props.address}/${this.props.manager}`)
        }
    } 

    static async  getInitialProps(props){
        const campagin = Campaign(props.query.address);
        const summary = await campagin.methods.getSummary().call();
        return { 
            address : props.query.address ,
            amountRaised : summary[1],
            minimumContribution : summary[2],
            approversCount : summary[3],
            manager : props.query.manager
        };
    }

    deleteCamp = async () => {
        this.setState({deleteLoading : true});
        const token = localStorage.getItem('token');
        const route = "http://localhost:8000/delete/campaign/address";
        const result = await fetch(route,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                campaignAddress: this.props.address,
                token
            })
        });

        const res = await result.json();
        if(res.status == 'success'){
            Router.push('/');
        }
        else{
            alert('there is a problem with your deleting !!!'); // must change to a toast
        }
        console.log(res);

        this.setState({deleteLoading : false});
    }

    reportCamp = async () => {
        this.setState({loadingReport : true});
        const { token } = this.state;
        const result = await fetch('http://localhost:8000/report/campagin/address',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                campaignAddress: this.props.address,
                token
            })
        });
        this.setState({loadingReport : false})
        const response = await result.json();
        console.log(response);
    }

    async componentDidMount(){
        let exp;
        let token;
        try{
            token = localStorage.getItem('token');
            const decoded = jwt.verify(token,'secretkey');
            exp = decoded.exp * 1000;
        }catch(e){
            exp = null;
            token = null;
            console.log(e);
        }

        const result = await fetch('http://localhost:8000/find/campaign',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                campaignAddress: this.props.address
            })
        });
        
        if(token){
            const isUser = await fetch('http://localhost:8000/find/user',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token : token
                })
            });
            var resUser = await isUser.json();
        }
        let isManger = false;
        let user = await web3.eth.getAccounts();
        const campResult = await result.json();
        if(token){
            if(campResult.data.user === resUser.data._id ){
                isManger = true;
            }
        }       
        let nonDate = campResult.data.expiredDate.slice(0,10);
        let date = new Date(`${nonDate}`);
        var diff = new moment.duration(date.getTime() - Date.now());
        let newDate = Math.floor(diff.asDays());

        this.setState({
            data : campResult.data ,
            info : campResult.data.description,
            date : newDate ,
            dateInMilliSeconds : date , 
            isManager : isManger,
            token,
            exp
        });
    }

    collectMoney = async () => {

        this.setState({collectLoading : true});

        const campagin = await Campaign(this.props.address);
        let accounts = await web3.eth.getAccounts();
        await campagin.methods.collectMoney().send({
            from : accounts[0]
        });

        this.setState({collectLoading : false});
        Router.replace(`/campaigns/show/${this.props.address}/${this.props.manager}`)
    }

    editCampaign = () => {
        this.setState({editLoading : true});
    }

    saveChanges = async () => {
        const { address } = this.props;
        const { info , token } = this.state;
        const route = `/edit/campaign/${address}`;
        await fetch(`http://localhost:8000${route}`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description : info,
                    campaignAddress : address,
                    token : token
                })
            }).then(result =>{
                return result.json()   
            }).then(res => {
                if(res.status == 'success'){
                    this.setState({editLoading : false});
                    Router.replace(`/campaigns/show/${this.props.address}/${this.props.manager}`)                    
                } else {
                    alert(res.message);
                    this.setState({editLoading : false});
                }
            }) 
        
    }

    discardChanges = () => {
        const description = this.state.data.description;
        this.setState({info : description,editLoading : false});        
    }

    render(){
        const { data , date , dateInMilliSeconds } = this.state;
        console.log(this.state);
        if(data)
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
                                        {data.name}
                                    </span>
                                    </h1>
                                    <h4 style={{color : '#252525'}}>
                                    <span style={{backgroundColor : '#fff',padding : '5px',boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                                        {data.info}
                                    </span>
                                    </h4>
                                    <div style={{marginTop : '25px'}}>
                                        <a href="#">
                                            <span style={{backgroundColor : '#fff',padding : '15px',boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.1)'}}>
                                                <Image src='https://placeholdit.co//i/580x580?bg=eeeeee' avatar size="mini"/>
                                                <span style={{marginLeft : '5px'}}>
                                                    <span style={{fontWeight : 'bold',fontSize : 15}}>{data.author}</span>
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
                                            <Image centered size="massive" src={data.image} />
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={7}>
                                    <Card fluid style={{borderRadius : 1.5,boxShadow : 'none'}}>
                                        <Card.Content>
                                            <div>
                                                <Progress style={{borderRadius : 1.5,marginBottom : '15px'}} color="blue" size="tiny" percent={(this.props.amountRaised / data.budget) * 100} />
                                                <span style={{fontSize : 30,color : 'rgba(65,109,234,0.9)'}}>{web3.utils.fromWei(`${this.props.amountRaised}`,'ether')} ETH</span><br/>
                                                <span style={{color : '#aaa',fontWeight : '200',fontSize : 16}}>pledged of <span>{web3.utils.fromWei(`${data.budget}`,'ether')} ETH</span> goal</span>
                                            </div>
                                            <br/>
                                            <div>
                                                <span style={{display : 'block',fontWeight : '600',fontSize : 18,color : 'rgba(65,109,234,0.9)'}}>{this.props.approversCount}</span>
                                                <span style={{color : '#aaa',fontWeight : '200',fontSize : 16}}>Contributers</span>
                                            </div>
                                            <br/>
                                            { dateInMilliSeconds > new Date().getTime() ? 
                                            <div>
                                                <span style={{display : 'block',fontWeight : '600',fontSize : 18,color : 'rgba(65,109,234,0.9)'}}>{date}</span>
                                                <span style={{color : '#aaa',fontWeight : '200',fontSize : 16}}>Days to go</span>
                                            </div> : <div><Label color='red' horizontal>Has Expired</Label></div> }
                                            <br/>
                                            { dateInMilliSeconds > new Date().getTime() ? <div>
                                            {this.state.exp && this.state.token ? <Card.Description>
                                                <Input fluid onChange={(e)=>{this.setState({inputValue : e.target.value})}} labelPosition='left' placeholder={`${web3.utils.fromWei(`${this.props.minimumContribution}`,'ether')}`} action>
                                                    <Label>ETH</Label>
                                                    <input disabled={this.state.loadingInput} value={this.state.inputValue} />
                                                    <Button loading={this.state.loadingInput} onClick={()=>{this.DonationInput(this.state.inputValue)}} style={{backgroundColor : '#416DEA',color : '#fff'}}>Contribute</Button>
                                                </Input>
                                            </Card.Description> : <div><Link route={'/login'}><Button content="Please login/sigup first for more info" fluid/></Link></div> }
                                            <Divider/>
                                            <br/>
                                            <div>
                                                
                                                <Grid stackable>
                                                        <Grid.Row columns={2}>
                                                            <Grid.Column>
                                                                { this.state.token ?  <SaveButton token = {this.state.token} address = {this.props.address} /> : <SaveButton />}
                                                            </Grid.Column>
                                                            <Grid.Column>
                                                                {this.state.exp && this.state.token ? <div>
                                                                    <Button loading={this.state.loading} onClick={()=>{this.DonationButton(web3.utils.fromWei(this.props.minimumContribution,'ether'))}} className="item" style={{
                                                                        borderRadius : 1.5,
                                                                        color : '#fff',
                                                                        backgroundColor : '#416DEA',
                                                                        border : 'none',
                                                                        boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)',
                                                                        padding : '12px',
                                                                        width : '100%',
                                                                        display : 'block',
                                                                        textAlign : 'center',
                                                                        fontSize : 15,
                                                                        fontWeight : '600'}}>
                                                                        Donate {web3.utils.fromWei(this.props.minimumContribution,'ether')} ETH
                                                                    </Button>
                                                                </div> : <div></div> }
                                                                
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                </Grid>
                                            </div>
                                            </div> : <div><Label color='red' horizontal>Has Expired</Label></div> } 
                                            <br/>
                                            <div>
                                                <Grid stackable>
                                                    <Grid.Row columns={1}>
                                                        <Grid.Column>
                                                            <span style={{backgroundColor : '#eee',padding : '5px',margin : '5px'}}>
                                                                <Icon name="tag" />
                                                                {data.category}
                                                            </span>
                                                            <span style={{backgroundColor : '#eee',padding : '5px',margin : '5px'}}>
                                                                <Icon name="location arrow" />
                                                                Austin, TX
                                                            </span>
                                                            {this.state.isManager ? <div> <Divider/> <Button content ="Collect Money" onClick={this.collectMoney} loading={this.state.collectLoading} fluid style={{
                                                                        borderRadius : 1.5,
                                                                        color : '#fff',
                                                                        backgroundColor : '#416DEA',
                                                                        border : 'none',
                                                                        boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)',
                                                                        padding : '12px',
                                                                        width : '100%',
                                                                        display : 'block',
                                                                        textAlign : 'center',
                                                                        fontSize : 15,
                                                                        fontWeight : '600'}}/>
                                                                        <br/> <Button
                                                                        loading={this.state.deleteLoading}
                                                                        onClick={this.deleteCamp} content ="Delete Campaign" fluid style={{
                                                                        borderRadius : 1.5,
                                                                        color : '#fff',
                                                                        backgroundColor : '#416DEA',
                                                                        border : 'none',
                                                                        boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)',
                                                                        padding : '12px',
                                                                        width : '100%',
                                                                        display : 'block',
                                                                        textAlign : 'center',
                                                                        fontSize : 15,
                                                                        fontWeight : '600'}}/>
                                                                        <br/> <Button
                                                                        loading={this.state.editLoading}
                                                                        onClick = {this.editCampaign}
                                                                         content ="Edit Campaign" fluid style={{
                                                                        borderRadius : 1.5,
                                                                        color : '#fff',
                                                                        backgroundColor : '#416DEA',
                                                                        border : 'none',
                                                                        boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)',
                                                                        padding : '12px',
                                                                        width : '100%',
                                                                        display : 'block',
                                                                        textAlign : 'center',
                                                                        fontSize : 15,
                                                                        fontWeight : '600'}}/>
                                                                        
                                                                        <br/> <Divider/> </div>
                                                                         : <div/>}
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
                                    {this.state.editLoading ? <div>
                                        <Form>
                                            <Form.Field>
                                                <label>Try Editing Your Campaign So Easy Just Add Something in markDown and then hit save changes!!!</label>
                                                <TextArea rows={1} value={this.state.info} onChange={(e)=>{this.setState({info : e.target.value})}} autoHeight placeholder='Try adding single lines to edit your campaign! in (markdown)'/> 
                                            </Form.Field>
                                        </Form>                                   
                                    </div> : 
                                    <div dangerouslySetInnerHTML={{__html : marked(data.description)}}>
                                    </div>}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        </div>
                        {this.state.token && this.state.exp && dateInMilliSeconds > new Date().getTime() ? <div style={{marginTop : '10px'}}>
                            {this.state.editLoading ? <div>
                                <Button onClick={this.discardChanges} loading={this.state.loadingReport} content="Discard Changes" /> 
                                <Button onClick={this.saveChanges} loading={this.state.loadingReport} content="Save Changes" style={{
                                                                        color : '#fff',
                                                                        borderRadius : 1.5,
                                                                        backgroundColor : '#416DEA',
                                                                        borderColor : '#fff',
                                                                        borderWidth : 1,
                                                                        borderStyle : 'solid',
                                                                        padding : '12px',
                                                                        textAlign : 'center',
                                                                        fontSize : 15,
                                                                        fontWeight : '600'}} />                                                                
                            </div> : 
                                <Button onClick={this.reportCamp} loading={this.state.loadingReport} content="Report Project" />
                            }
                        </div> : <div/> }
                                        
                    </Container>
                </div>
                <div className="Footer" style={{marginBottom : '10px',borderColor : '#eee',borderStyle:'solid',borderWidth : 1,marginTop : '10px',marginBottom : '0',padding : '15px',backgroundColor : '#fff'}}>
                    <Container>
                        <Footer/>
                    </Container>
                </div>
            </div>
        )
        else{
            return(
                <div/>
            )
        }
    }
}