import React , {Component} from 'react';
import { Button, Grid , Divider , Container , Advertisement , Dropdown , Tab , Image , Icon , Popup , Label } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ForgotPasswordForm from './components/ForgotPasswordForm';

export default class ForgotPassword extends Component{
    render(){
        return(
            <div style={{backgroundColor:'rgba(65,109,234,1)'}}>    
                <Navbar/>
                <Container style={{padding : '15px',margin: '10px'}}>
                    <div>
                        <Grid columns={3} stackable>
                            <Grid.Row>
                                <Grid.Column></Grid.Column>
                                <Grid.Column>
                                    <ForgotPasswordForm/>
                                </Grid.Column>
                                <Grid.Column></Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </Container>
                <div className="Footer" style={{marginBottom : '10px',borderColor : '#eee',borderStyle:'solid',borderWidth : 1,marginTop : '10px',marginBottom : '0',padding : '15px',backgroundColor : '#fff'}}>
                    <Container>
                        <Footer/>
                    </Container>
                </div>
            </div>
        )
    }
}