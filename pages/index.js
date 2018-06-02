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
        // await fetch('http://localhost:8000/get/all/campaigns').then((response) => response.json())
        // .then((responseJson) => {
        //   campaign = responseJson.data;
        // })
        // .catch((error) => {
        //   console.error(error);
        // });
        return { campaign };
    }

    constructor(){
        super();
        this.state = {
            category : '',
            campaign : ''
        }
    }

    async componentDidMount(){
        let response = await fetch('http://localhost:8000/get/all/campaigns');
        let campaign = await response.json();
        this.setState({campaign : campaign.data})
    }

    render(){
        const { campaign } = this.state;
        console.log(campaign)
        if(campaign)
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
                                All Campaigns
                            </span>
                        </h1>
                        <br/>
                        <Cards datas={this.state.campaign}/>
                        <br/>
                        <br/>
                    </Container>
                </div>
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
        else
        return(
            <div></div>
        )
    }
}



