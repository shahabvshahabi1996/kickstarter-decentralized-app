import React , {Component} from "react";
import { Button, Grid , Divider , Container , Advertisement , Tab , Image , Icon , Popup , Label } from 'semantic-ui-react';
import SimpleCard from './components/SimpleCards';
import Navbar from './components/Navbar';
import TopCampaigns from './components/TopCampaigns';
import Cards from './components/Cards'; 
import BlogCards from './components/BlogCards'; 

import factory from '../factory';

const datas = [
    {
        name : "fem -A Japan-made Multifunctional bag for Minimalists",
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
        const campaigns = await factory.methods.getAllCampaigns().call();
        
        return {campaigns};
    }
    render(){
        return(
            <div style={{backgroundColor:'rgba(65,109,234,1)'}}>    
                <Navbar/>
                <div>
                    <Container style={{padding : '15px',margin: '10px'}}>
                        <h1 style={{color : '#252525'}}><span style={{backgroundColor : '#fff',borderRadius : 1.5,padding : '2px',paddingLeft : '5px',paddingRight : '5px'}}>Top Campaigns</span><span><Button icon floated="right" style={{borderRadius : 2,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}} labelPosition='right'>View All <Icon name='right arrow' /> </Button></span></h1>
                        <Cards datas={datas}/>
                    </Container>
                </div>
                <div style={{marginBottom : '10px',borderColor : '#eee',borderStyle:'solid',borderWidth : 1,marginTop : '10px',marginBottom : '0',padding : '15px',backgroundColor : '#fff'}}>
                    <Container style={{margin : '10px'}}>
                        <h1>
                            <span style={{backgroundColor:'rgba(65,109,234,1)',padding : '2px' , paddingLeft : '5px' , paddingRight : '5px',color : '#fff'}}>
                            Recomended
                            </span>
                            <span>
                                <Button icon floated="right" style={{borderRadius : 2,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}} labelPosition='right'>
                                View All <Icon name='right arrow' />
                                </Button>
                            </span>
                        </h1>
                        <Cards datas={datas}/>
                    </Container>
                </div>
                <div>
                    <Container style={{padding : '15px',margin: '10px'}}>
                        <h1 style={{color : '#252525'}}><span style={{backgroundColor : '#fff',borderRadius : 1.5,padding : '2px',paddingLeft : '5px',paddingRight : '5px'}}>Our Blog</span><span><Button icon floated="right" style={{borderRadius : 2,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}} labelPosition='right'>View All <Icon name='right arrow' /> </Button></span></h1>
                        <BlogCards/>                        
                    </Container>
                </div>
            </div>
        )
    }
}



