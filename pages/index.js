import React , {Component} from "react";
import { Button, Card, Grid , Divider , Container , Image , Icon , Popup , Label } from 'semantic-ui-react';
import SimpleCard from './components/SimpleCards';
import Navbar from './components/Navbar';
import TopCampaigns from './components/TopCampaigns';

import factory from '../factory';

const datas = [
    {
        name : "fem -A Japan-made Multifunctional bag for Minimalists",
        budget : "87%",
        description : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
    },
    {
        name : "Something new to That World bag for Minimalists",
        budget : "32%",
        description : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
    },
    {
        name : "Something new to Another world bag for Minimalists",
        budget : "25%",
        description : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
    },
    {
        name : "Somthing new to this world bag for Minimalists",
        budget : "2%",
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
                <Container>
                    <TopCampaigns datas={datas} />
                </Container>
            </div>
        )
    }
}



