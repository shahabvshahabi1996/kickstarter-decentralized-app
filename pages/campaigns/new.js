import React ,{ Component } from "react";
import Navbar from '../components/Navbar';

export default class CampaignNew extends Component{
    render(){
        return(
            <div>
                <Navbar/>
                <h1>Start a New Campaign</h1>
                <p>we need a form for that and a littile of authenications</p>
            </div>
        )
    }
}