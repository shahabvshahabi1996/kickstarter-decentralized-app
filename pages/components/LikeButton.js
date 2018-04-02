import React , {Component} from 'react';
import {Popup , Icon} from 'semantic-ui-react';
import web3 from '../../web3';
import jwt from 'jsonwebtoken';

export default class LikeButton extends Component{
    constructor(){
        super();
        this.state = {
            liked : undefined
        }
    }
    async componentDidMount(){
        let token;
        try{
            token = localStorage.getItem('token');
            const decoded = jwt.verify(token,'secretkey');
        }catch(e){
            token = null;
            console.log(e);
        }

        if(token){
            this.setState({token : true});
            const route = "http://localhost:8000/is/like/campaign/address";
            const result = await fetch(route,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    campaignAddress: this.props.address,
                    token : token
                })
            });
    
            const res = await result.json();
            if(res.data){
                this.setState({liked : true});
            } else {
                this.setState({liked : false});
            }
        }else{
            this.setState({token : false});
        }
    }

    likeAction = async () => {
        const { liked } = this.state;
        const token = await localStorage.getItem('token'); 
        let route;

        if(!liked){
            route = "http://localhost:8000/like/campaign/address"            
        }
        else {
            route = "http://localhost:8000/dislike/campaign/address"
        }
        const result = await fetch(route,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                campaignAddress: this.props.address,
                token : token
            })
        });
        
        const res = await result.json();
        this.setState({liked : !liked});
    }
    render(){
        if(this.state.token){
            if(this.state.liked){
                return(
                <div style={{position: 'absolute', top: '3.5%',left : '88%', width: '100%', height: 'auto'}}>
                    <Popup
                    trigger={<a onClick={this.likeAction} style={{color : 'red'}}><Icon style={{backgroundColor : 'transparent'}} name='heart' color="red" size='large' /></a>}
                    content='Saved'
                    position='top center'
                    />
                </div>        
                )
            }
            else
            return(
                <div style={{position: 'absolute', top: '3.5%',left : '88%', width: '100%', height: 'auto'}}>
                    <Popup
                    trigger={<a onClick={this.likeAction} style={{color : '#252525'}}><Icon style={{backgroundColor : 'transparent'}} name='heart outline' size='large' /></a>}
                    content='Save it'
                    position='top center'
                    />
                </div>
            )
        }else{
            return <div/>
        }
    }
}