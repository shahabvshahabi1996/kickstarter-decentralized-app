import React , {Component} from "react";
import { Button, Grid , Divider , Container , Tab , Image , Icon , Popup , Label } from 'semantic-ui-react';
import SimpleCard from './components/SimpleCards';
import Navbar from './components/Navbar';
import TopCampaigns from './components/TopCampaigns';
import Cards from './components/Cards'; 

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
    },
    {
        name : "Somthing new to this world bag for Minimalists",
        budget : "2",
        description : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
    },
    {
        name : "Something new to That World bag for Minimalists",
        budget : "32",
        description : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
    },
    {
        name : "Something new to Another world bag for Minimalists",
        budget : "250",
        description : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
    },
    {
        name : "Somthing new to this world bag for Minimalists",
        budget : "10",
        description : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
    },
    {
        name : "Something new to Another world bag for Minimalists",
        budget : "25",
        description : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
    },
]




export default class CampaignIndex extends Component {
    static async getInitialProps(){
        const campaigns = await factory.methods.getAllCampaigns().call();
        
        return {campaigns};
    }
    render(){
        return(
            <div>    
                <Navbar/>
                <Container style={{padding : '10px'}}>
                    <h1>Top Campaigns<span><Button floated="right" icon labelPosition='right'>View All <Icon name='right arrow' /> </Button></span></h1>
                    {/* <Divider /> */}
                    {/* <TopCampaigns datas={datas} /> */}
                    <Cards datas={datas}/>
                </Container>
                <div style={{borderColor : '#eee',borderStyle:'solid',borderWidth : 1,marginTop : '10px',marginBottom : '10px',padding : '15px'}}>
                    <Container>
                        <h1>Recomended For You</h1>
                    </Container>
                </div>
            </div>
        )
    }
}



