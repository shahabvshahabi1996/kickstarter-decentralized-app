import React , {Component} from "react";
import factory from '../factory';

export default class CampaignIndex extends Component {
    async componentDidMount(){
        const campaigns = await factory.methods.getAllCampaigns().call();
        console.log(campaigns);
    }

    render(){
        return(
            <h1>hello world</h1>
        )
    }
}


