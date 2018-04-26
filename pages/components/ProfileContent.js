import React , {Component} from 'react';
import { Image , Card , Grid , Divider } from 'semantic-ui-react';


const About = (
    <div style={{marginTop : '10px'}}>
        <h5>About</h5>
        <p>Lorem Ipsum</p>
    </div>
);

export default class ProfileContent extends Component {
    
    componentDidMount = () => {

    }

    render(){
        return(
            <div style={{margin : '5px',marginTop : '15px'}}>
                <Grid columns={2} stackable>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Card
                                image='http://via.placeholder.com/350x350'
                                header='User Name'
                                description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                            />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <div>
                                <h2>User's Campaign</h2>
                                <Divider/>
                                <p>This is where all campaigns renders</p>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}