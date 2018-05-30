import React , {Component} from 'react';
import { Image , Card , Grid , Divider } from 'semantic-ui-react';
import Cards from './Cards';  
import jwt from 'jsonwebtoken';


const About = (
    <div style={{marginTop : '10px'}}>
        <h5>About</h5>
        <p>Lorem Ipsum</p>
    </div>
);

export default class ProfileContent extends Component {

    constructor() {
        super();
        this.state = {
            campaigns : ''
        }
    }
    
    componentDidMount = async () => {
        let fetchUserCamps = await fetch('http://localhost:8000/find/user/campaign',{
            method : "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body :JSON.stringify({
                token : this.props.token
            })
        });

        let fetchUserLikes = await fetch("http://localhost:8000/find/all/user/likes",{
            method : "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body :JSON.stringify({
                token : this.props.token
            })
        });

        let likes = await fetchUserLikes.json();

        let campaigns = await fetchUserCamps.json();

        let decoded = jwt.verify(this.props.token , 'secretkey');
        let name = decoded.data.name;
        this.setState({campaigns : campaigns.data , name , likes : likes.data});
        
    }

    render(){
        const { campaigns , name , likes } = this.state;
        console.log(this.state);
        if(campaigns && name && likes)
        return(
            <div style={{margin : '5px',marginTop : '15px'}}>
                <Grid columns={2} stackable>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <div>
                                <h2>{name}'s Campaigns</h2>
                                <Divider/>
                                <Cards datas={campaigns}/>                             
                            </div>
                            <br/>
                            <div>
                                {
                                    likes.length != 0 ?
                                    <div> 
                                        <h2>{name}'s Favorites</h2>
                                        <Divider/>
                                        <Cards datas={likes}/>
                                    </div> : 
                                    <div></div>
                                }
                                                             
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
        else {
            return <div></div>
        }
    }
}