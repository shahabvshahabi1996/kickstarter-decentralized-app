import React , {Component} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Grid, Container , Card , Icon,Image,Button } from 'semantic-ui-react';
export default class Show extends Component{
    render(){
        return(
            <div style={{backgroundColor:'rgba(65,109,234,1)'}}>
                <Navbar/>
                <div>
                    <Container style={{padding : '10px'}}>
                        <Grid columns={2} stackable>
                            <Grid.Row>
                                <Grid.Column width={0}>
                                    {/* <Card fluid style={{backgroundColor : '#fff',border:0,borderRadius : 1.5,boxShadow : 'none',display : 'block',textAlign : 'center',boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                                        <Card.Content>
                                            <div style={{margin : '10px',display : 'block',textAlign : 'center'}}> 
                                                <Image fluid src='https://placeholdit.co//i/580x580?bg=eeeeee' size="tiny" centered circular />
                                            </div>
                                        <Card.Header>
                                            <a style={{color : '#252525',fontSize : 15}}>
                                            The Author
                                            </a>
                                        </Card.Header>
                                        <Card.Meta>
                                            <div style={{textAlign : 'center',margin : '10px'}}>
                                                <Button content='Follow' style={{fontSize : 13}} />
                                            </div>
                                        </Card.Meta>
                                        </Card.Content>
                                    </Card> */}
                                </Grid.Column>
                                <Grid.Column width={16}>
                                    <h1 style={{fontSize : 35}}>
                                    <span style={{backgroundColor : '#fff',padding : '5px',boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                                        Skalpel | The world's most stylish steak knife
                                    </span>
                                    </h1>
                                    <h4 style={{color : '#252525'}}>
                                    <span style={{backgroundColor : '#fff',padding : '5px',boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                                        Taking inspiration from a surgeon's scalpel we've created a handmade steak knife like no other.
                                    </span>
                                    </h4>
                                    <div style={{marginTop : '25px'}}>
                                    <a href="#">
                                        <span style={{backgroundColor : '#fff',padding : '15px',boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.1)'}}>
                                            <Image src='https://ksr-ugc.imgix.net/assets/020/053/501/9745da2bb74cb47f891302f3c052ebb3_original.jpg?w=80&h=80&fit=crop&v=1517397318&auto=format&q=92&s=f0e7f57fa688a6d6cd2bd6aa7b74bb0d' avatar size="mini"/>
                                            <span style={{marginLeft : '5px'}}>
                                                <span style={{fontWeight : 'bold',fontSize : 15}}>Skalpel</span>
                                            </span>
                                        </span>
                                        <br/>
                                    </a>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
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