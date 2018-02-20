import React , {Component} from 'react'
import { Card , Grid } from 'semantic-ui-react'

export default class BlogCards extends Component {
    render(){
        return(
            <Grid stackable columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        <Card fluid style={{marginTop : '10px',marginBottom : '10px',borderRadius : 1 ,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                            <Card.Content>
                                <Card.Header>Matthew Harris</Card.Header>
                                <Card.Meta>Co-Worker</Card.Meta>
                                <Card.Description>Matthew is a pianist living in Nashville.</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card fluid style={{marginTop : '10px',marginBottom : '10px',borderRadius : 1 ,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                            <Card.Content>
                                <Card.Header>Matthew Harris</Card.Header>
                                <Card.Meta>Co-Worker</Card.Meta>
                                <Card.Description>Matthew is a pianist living in Nashville.</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card fluid style={{marginTop : '10px',marginBottom : '10px',borderRadius : 1 ,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                            <Card.Content>
                                <Card.Header>Matthew Harris</Card.Header>
                                <Card.Meta>Co-Worker</Card.Meta>
                                <Card.Description>Matthew is a pianist living in Nashville.</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card fluid style={{marginTop : '10px',marginBottom : '10px',borderRadius : 1 ,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                            <Card.Content>
                                <Card.Header>Matthew Harris</Card.Header>
                                <Card.Meta>Co-Worker</Card.Meta>
                                <Card.Description>Matthew is a pianist living in Nashville.</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card fluid style={{marginTop : '10px',marginBottom : '10px',borderRadius : 1 ,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                            <Card.Content>
                                <Card.Header>Matthew Harris</Card.Header>
                                <Card.Meta>Co-Worker</Card.Meta>
                                <Card.Description>Matthew is a pianist living in Nashville.</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card fluid style={{marginTop : '10px',marginBottom : '10px',borderRadius : 1 ,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                            <Card.Content>
                                <Card.Header>Matthew Harris</Card.Header>
                                <Card.Meta>Co-Worker</Card.Meta>
                                <Card.Description>Matthew is a pianist living in Nashville.</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card fluid style={{marginTop : '10px',marginBottom : '10px',borderRadius : 1 ,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                            <Card.Content>
                                <Card.Header>Matthew Harris</Card.Header>
                                <Card.Meta>Co-Worker</Card.Meta>
                                <Card.Description>Matthew is a pianist living in Nashville.</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

