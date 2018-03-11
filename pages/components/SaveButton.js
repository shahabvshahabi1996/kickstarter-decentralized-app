import React , {Component} from 'react';
import { Icon , Button} from 'semantic-ui-react';

export default class SaveButton extends Component{
    state = {
        liked : false
    }
    render(){
        if(!this.state.liked)
        return(
               <Button onClick={()=>{this.setState({liked : !this.state.liked})}} style={{padding : '12px',fontSize : 15,borderRadius : 1.5}} fluid icon="heart" labelPosition="right" content="Save it!"/>            
        )
        else {
            return(
                <Button onClick={()=>{this.setState({liked : !this.state.liked})}} color="red" style={{padding : '12px',fontSize : 15,borderRadius : 1.5}} fluid content="Saved!"/>                            
            )
        }
    }
}