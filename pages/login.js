import React , {Component} from 'react';
import { Button, Grid , Portal , Segment , Header , Divider , Container , Advertisement , Dropdown , Tab , Image , Icon , Popup , Label } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';

export default class Login extends Component{

    constructor() {
        super();
        this.state = {
            open : false,
            message : '',
            status : ''
        }
    }
    
    handlePortal = (status , message) => {
        this.setState({open : true, status , message});
        setTimeout(()=>{
            this.setState({open : false, status : '',message : '' })
        },3000)
    }

    render(){
        const { open , message , status } = this.state;
        return(
            <div style={{backgroundColor:'rgba(65,109,234,1)'}}>    
                <Navbar/>
                <Container style={{padding : '15px',margin: '10px'}}>
                    <div>
                        <Grid columns={3} stackable>
                            <Grid.Row>
                                <Portal open={open}>
                                    { status == 'success' ? 
                                    <Segment style={{ right : '1%', position: 'fixed', top: '12%', zIndex: 1000 , backgroundColor : '#2ECC71'}}>
                                        <Header>{this.state.status.toUpperCase()}</Header>
                                        <p>{this.state.message}</p>
                                    </Segment> 
                                    : 
                                    <Segment style={{ right : '1%', position: 'fixed', top: '12%', zIndex: 1000 , backgroundColor : '#E74C3C'}}>
                                        <Header>{this.state.status.toUpperCase()}</Header>
                                        <p>{this.state.message}</p>
                                    </Segment> }
                                </Portal>
                                <Grid.Column></Grid.Column>
                                <Grid.Column>
                                    <div style={{backgroundColor:'#fff',
                                    padding : '15px',
                                    margin : '5px',
                                    boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)',
                                    borderRadius : 1.5}}>
                                        <LoginForm toast={this.handlePortal}/>
                                    </div>
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