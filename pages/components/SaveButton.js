import React , {Component} from 'react';
import { Icon , Button} from 'semantic-ui-react';
import jwt from 'jsonwebtoken';

export default class SaveButton extends Component{
    state = {
        liked : undefined
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
            console.log('there is token!');
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
                    token : this.props.token
                })
            });
    
            const res = await result.json();
            if(res.data){
                this.setState({liked : true});
            } else{
                this.setState({liked : false});
            }
        }else{
            this.setState({token : false});
        }

    }

    likeAction = async () => {
        this.setState({loading : true});
        const { liked } = this.state; 
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
                token : this.props.token
            })
        });
        
        const res = await result.json();
        this.setState({liked : !liked});
        console.log(res);
        this.setState({loading : false});
    }
    
    render(){
        if(this.state.token){
            if(!this.state.liked)
            return(
                   <Button loading={this.state.loading} onClick={this.likeAction} style={{padding : '12px',fontSize : 15,borderRadius : 1.5}} fluid icon="heart" labelPosition="right" content="Save it!"/>            
            )
            else {
                return(
                    <Button loading={this.state.loading} onClick={this.likeAction} color="red" style={{padding : '12px',fontSize : 15,borderRadius : 1.5}} fluid content="Saved!"/>   
                )
            }
        }else{
            return <div/>
        }
    }
}