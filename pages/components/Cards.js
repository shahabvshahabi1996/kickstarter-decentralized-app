import React , {Component} from 'react';
import { Button, Card, Grid , Divider , Container , Image , Icon , Popup } from 'semantic-ui-react';

import ProgressBar from './ProgressBar';

export default class Cards extends Component{
    render(){
        return(
            <Grid stackable>
                <Grid.Row columns={3}>
                    {this.props.datas.map((data,index)=>{
                        return(
                            <Grid.Column key={index} width={4} mobile={16} tablet={5} largeScreen={4} wideScreen={4} computer={4}>
                                <Card style={{marginTop : '10px',marginBottom : '10px',borderRadius : 1 ,boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.15)'}}>
                                    <div className="ui fluid image">
                                        <Image src='https://placeholdit.co//i/580x580?bg=eeeeee' />
                                        <div style={{position: 'absolute', top: '2%',left : '88%', width: '100%', height: 'auto'}}>
                                            <Popup
                                            trigger={<a style={{color : '#252525'}} href="#"><Icon style={{backgroundColor : 'transparent'}} name='heart outline' size='large' /></a>}
                                            content='Save it'
                                            position='top center'
                                            />
                                        </div>
                                    </div>
                                    <Card.Content>
                                        <Card.Header>
                                            <h4>{data.name.slice(0,50) + '...'}</h4>
                                        </Card.Header>
                                        <Card.Meta>
                                            <h5 className='date Category'>
                                            Desing & Tech
                                            </h5>
                                        </Card.Meta>
                                        <Card.Description>
                                            <p>{data.description.slice(0,50) + '...'}</p>
                                        </Card.Description>
                                        <Divider/>
                                        <Card.Description>
                                            {data.budget}% funded
                                            <ProgressBar percent={data.budget}/>
                                        </Card.Description>
                                        <Card.Description>
                                            <Button icon fluid labelPosition='right'>View Campaign <Icon name='right arrow' /></Button>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        )
                    })}
                    
                </Grid.Row>
            </Grid>
        )
    }
}