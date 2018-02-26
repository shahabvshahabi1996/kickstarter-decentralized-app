import React ,{ Component } from "react";
import {Container , Grid } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewCampaginForm from '../components/NewCampaginForm';


export default class CampaignNew extends Component{
    render(){
        return(
            <div style={{backgroundColor:'rgba(65,109,234,1)'}}>
                <Navbar/>
                <div>
                    <Container>
                        <h1><span style={{backgroundColor : '#fff',
                                borderRadius : 1.5,
                                padding : '2px',
                                paddingLeft : '5px',
                                paddingRight : '5px'}}>Start a New Campaign</span></h1>
                        <div>
                            <Grid stackable columns={3}>
                                <Grid.Row>
                                    <Grid.Column width={2}></Grid.Column>
                                    <Grid.Column width={12}>
                                        <div style={{backgroundColor:'#fff',
                                    padding : '15px',
                                    margin : '5px',
                                    boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)',
                                    borderRadius : 1.5}}>
                                            <NewCampaginForm/>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={2}></Grid.Column>
                                </Grid.Row>
                            </Grid>
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