import React , {Component} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {Container} from 'semantic-ui-react';
export default class Show extends Component{
    render(){
        return(
            <div style={{backgroundColor:'rgba(65,109,234,1)'}}>
                <Navbar/>
                <div>
                    <Container>
                        <h3>Camapain Show</h3>
                        <p>We Have The Information of the campaign</p>
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