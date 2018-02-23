import React , {Component} from 'react';
import {Popup , Icon} from 'semantic-ui-react';

export default class LikeButton extends Component{
    constructor(){
        super();
        this.state = {
            active : 0
        }
    }
    clicked(){
        this.setState({active : !this.state.active});
    }
    render(){
        if(this.state.active){
            return(
            <div style={{position: 'absolute', top: '2%',left : '88%', width: '100%', height: 'auto'}}>
                <Popup
                trigger={<a onClick={this.clicked = this.clicked.bind(this)} style={{color : 'red'}}><Icon style={{backgroundColor : 'transparent'}} name='heart' color="red" size='large' /></a>}
                content='Saved'
                position='top center'
                />
            </div>        
            )
        }
        else
        return(
            <div style={{position: 'absolute', top: '2%',left : '88%', width: '100%', height: 'auto'}}>
                <Popup
                trigger={<a onClick={this.clicked = this.clicked.bind(this)} style={{color : '#252525'}}><Icon style={{backgroundColor : 'transparent'}} name='heart outline' size='large' /></a>}
                content='Save it'
                position='top center'
                />
            </div>
        )
    }
}