import React , {Component} from 'react'
import { Card , Grid } from 'semantic-ui-react'

export default class BlogCards extends Component {
    render(){
        return(
            <Grid stackable columns={3}>
                <Grid.Row>
                    {this.props.datas.map((data,index)=>{
                        return(
                            <Grid.Column>
                                <a href="#"><Card fluid style={{marginTop : '10px',marginBottom : '10px',borderRadius : 1 ,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                                    <Card.Content>
                                        <Card.Header>{data.name}</Card.Header>
                                        <Card.Meta>Co-Worker</Card.Meta>
                                        <Card.Description>{data.description.slice(0,30) + '...'}</Card.Description>
                                    </Card.Content>
                                </Card></a>
                            </Grid.Column>
                        )
                    })}
                </Grid.Row>
            </Grid>
        )
    }
}

