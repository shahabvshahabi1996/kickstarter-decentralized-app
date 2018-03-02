import React , {Component } from "react";
import { Button, Grid , Divider , Container , Advertisement , Dropdown , Tab , Image , Icon , Popup , Label } from 'semantic-ui-react';
import SimpleCard from './components/SimpleCards';
import Navbar from './components/Navbar';
import TopCampaigns from './components/TopCampaigns';
import Cards from './components/Cards'; 
import BlogCards from './components/BlogCards'; 
import Category from './components/Category';
import Footer from './components/Footer';

import factory from '../factory';

const datas = [
    {
        name : "Japan-made Multifunctional bag for Minimalists",
        budget : "87",
        description : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
    },
    {
        name : "Something new to That World bag for Minimalists",
        budget : "32",
        description : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
    },
    {
        name : "Something new to Another world bag for Minimalists",
        budget : "25",
        description : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
    }
]




export default class CampaignIndex extends Component {
    static async getInitialProps(){
        let campaign = [] ;
        const campaignsAddress = await factory.methods.getAllCampaigns().call();
        let campaignCounter = await factory.methods.getCampaignLength().call();
        for(let i = campaignCounter - 1; i >= 0 ;i--){
            campaign.push(await factory.methods.campaigns(i).call());
        }
        return {campaignsAddress , campaign };
    }

    constructor(){
        super();
        this.state = {
            category : ''
        }
    }

    render(){
        console.log(this.state);
        console.log(this.props)
        return(
            <div style={{backgroundColor:'rgba(65,109,234,1)'}}>    
                <Navbar/>
                <div className="TopCampaign">
                    <Container style={{padding : '15px',margin: '10px'}}>
                        <h1 style={{color : '#252525'}}>
                            <span style={{backgroundColor : '#fff',
                                borderRadius : 1.5,
                                padding : '2px',
                                paddingLeft : '5px',
                                paddingRight : '5px'}}>
                                Top Campaigns
                            </span>
                            <span>
                                <Button floated="right" icon style={{borderRadius : 2,
                                    boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}} 
                                    labelPosition='right'>
                                    View All 
                                    <Icon name='right arrow' /> 
                                </Button>
                            </span>
                        </h1>
                        <h1>
                            <span style={{ padding : '3.8px',
                                paddingLeft : '6px',
                                paddingRight : '6px',
                                paddingBottom : '1.8px',
                                paddingTop : '5.2px',
                                backgroundColor : '#fff',
                                borderRadius : 1.5,
                                margin : '0px',
                                fontSize : 25,
                                boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                                <Category selected={(cat)=>{this.setState({category : cat})}}/>
                            </span>
                        </h1>
                        <br/>
                        <Cards datas={this.props.campaign}/>
                        <br/>
                        <br/>
                    </Container>
                </div>
                {/* <div className="Recommended" style={{marginBottom : '10px',borderColor : '#eee',borderStyle:'solid',borderWidth : 1,marginTop : '10px',marginBottom : '0',padding : '15px',backgroundColor : '#fff'}}>
                    <Container style={{margin : '10px'}}>
                        <h1>
                            <span style={{backgroundColor:'rgba(65,109,234,1)',padding : '2px' , paddingLeft : '5px' , paddingRight : '5px',color : '#fff'}}>
                            Recomended
                            </span>
                        <span>
                            <Button floated="right" icon style={{borderRadius : 2,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}} labelPosition='right'>
                            View All <Icon name='right arrow' />
                            </Button>
                        </span>
                        </h1>
                        <br/><br/>
                        <Cards datas={datas}/>
                        <br/><br/>
                    </Container>
                </div> */}
                <div className="Blog"  style={{marginBottom : '10px',borderColor : '#eee',borderStyle:'solid',borderWidth : 1,marginTop : '10px',marginBottom : '0',padding : '15px',backgroundColor : '#fff'}}>
                    <Container style={{padding : '15px',margin: '10px'}}>
                        <h1 style={{color : '#fffff'}}><span style={{backgroundColor:'rgba(65,109,234,1)',padding : '2px' , paddingLeft : '5px' , paddingRight : '5px',color : '#fff'}}>Our Blog</span><span><Button icon floated="right" style={{borderRadius : 2,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}} labelPosition='right'>View All <Icon name='right arrow' /> </Button></span></h1>
                        <br/><br/>
                        <BlogCards datas={datas}/>                        
                        <br/><br/>            
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



