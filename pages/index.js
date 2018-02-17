import React , {Component} from "react";
import factory from '../factory';

export default class CampaignIndex extends Component {
    async componentDidMount(){
        const campaigns = await factory.methods.getAllCampaigns().call();
        console.log(campaigns);
    }

    render(){
        return(
            <h1 style={styles.textHeaderStyle}>welcome to the home page</h1>
        )
    }
}

const styles = {
    textHeaderStyle : {
        backgroundColor : '#252525',
        color : '#ffff',
    }
}


