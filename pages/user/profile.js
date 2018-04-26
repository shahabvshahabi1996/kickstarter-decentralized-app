import React , {Component} from 'react';
import { Button, Grid , Divider , Container , Advertisement , Dropdown , Tab , Image , Icon , Popup , Label } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfileContent from '../components/ProfileContent';

export default class Profile extends Component {

    static getInitialProps(props){
        return { 
            token : props.query.token
        };
    }

    componentDidMount(){

    }

    render(){
        return(
            <div style={{backgroundColor:'rgba(65,109,234,1)'}}>    
            <Navbar/>
            <Container style={{padding : '15px',margin: '10px'}}>
                <Grid columns={1} stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <div style={{backgroundColor:'#fff',
                            padding : '15px',
                            margin : '5px',
                            boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)',
                            borderRadius : 1.5}}>
                                <ProfileContent token={this.props.token}/>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
            <div className="Footer" style={{marginBottom : '10px',borderColor : '#eee',borderStyle:'solid',borderWidth : 1,marginTop : '10px',marginBottom : '0',padding : '15px',backgroundColor : '#fff'}}>
                <Container>
                    <Footer/>
                </Container>
            </div>
        </div>
        );
    }
}