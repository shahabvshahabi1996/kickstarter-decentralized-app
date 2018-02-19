import React , {Component} from 'react';
import { Button, Card, Grid , Divider , Container , Image , Icon , Popup } from 'semantic-ui-react';

export default class SimpleCards extends Component{
    render(){
        return(

        <Grid columns={3}>
        {this.props.datas.map((data,index) => {
            return(
            <Grid.Row key={index} style={{justifyContent : 'center',alignItems : 'center'}}>
                <Grid.Column width={4}>
                    <Image fluid src='https://placeholdit.co//i/500x300?bg=eeeeee' />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Card fluid style={{boxShadow : 'none'}}>
                        <Card.Content>
                            <Card.Header>
                            {data.name}
                            </Card.Header>
                            <Card.Meta>
                            {data.budget} funded
                            </Card.Meta>
                            <Card.Description>
                            {data.description}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column textAlign='center' width={2}>
                    <Popup
                    trigger={<a href="#"><Icon name='heart outline' color='black' size='large' /></a>}
                    content='Archive it'
                    position='top center'
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Grid.Row>
                        <Divider fitted />
                    </Grid.Row>    
                </Grid.Column>
            </Grid.Row>
            )
        })}
        </Grid>
        )
    }
}