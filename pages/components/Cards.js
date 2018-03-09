import React , {Component} from 'react';
import { Button, Card, Grid , Divider , Container , Image , Icon , Popup } from 'semantic-ui-react';

import ProgressBar from './ProgressBar';
import LikeButton from './LikeButton';

import {Link} from '../../routes';
import web3 from '../../web3';

export default class Cards extends Component{
    
    constructor(){
        super();
        this.state = {
            datas : undefined,
            category : ''
        }
    }

    async componentDidMount(){
        await this.setState({datas : this.props.datas})

    }

    render(){
        var {datas} = this.state;
        console.log(datas);
        if(datas != undefined)
        return(
            <Grid stackable>
                <Grid.Row columns={3}>
                    {datas.filter((data)=>{
                        if(this.state.category.length > 0)
                            return data.category == this.state.category;
                        else
                            return data  
                    }).map((data,index)=>{
                        console.log(data.image)
                        return(
                            <Grid.Column key={index}>
                                <Card fluid style={{marginTop : '10px',marginBottom : '10px',borderRadius : 1 ,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                                    <div className="ui fluid image">
                                        {/* {data.image.length > 0 ? 
                                        <Image style={{width : '100%',height : '300px'}} src={data.image} /> : 
                                        <Image style={{width : '100%',height : '300px'}} src='https://placeholdit.co//i/580x580?bg=eeeeee' />  } */}
                                        <Image style={{width : '100%',height : '300px'}} src={data.image} />
                                        {/* 'https://placeholdit.co//i/580x580?bg=eeeeee' */}
                                        <LikeButton link={data.campaignAddress}/>
                                    </div>
                                    <Card.Content>
                                        <Card.Header>
                                            <h4>{data.campaginName === undefined ? ' ' : data.campaginName.length <= 50 ? data.campaginName : data.campaginName.slice(0,50) + '...'}</h4>
                                        </Card.Header>
                                        <Card.Meta>
                                            <h5 className='date Category'>
                                                {data.category}
                                            </h5>
                                        </Card.Meta>
                                        <Card.Description>
                                            <p>{data.aboutCamapaign === undefined ? ' ' : data.aboutCamapaign.length <= 50 ? data.aboutCamapaign : data.aboutCamapaign.slice(0,50) + '...' }</p>
                                        </Card.Description>
                                        <Divider/>
                                        <Card.Description>
                                            {/* {data.budget}% funded */}
                                            Pledged of  {web3.utils.fromWei(data.budget,'ether')} ether
                                            {/* <ProgressBar percent={data.budget}/> */}
                                        </Card.Description>
                                        <Divider/>
                                        <Card.Description>
                                        <Link route={`/campaigns/show/${data.campaignAddress}`}>
                                            <a className="item" style={{
                                                borderRadius : 2,
                                                color : '#fff',
                                                backgroundColor : '#416DEA',
                                                border : 'none',
                                                boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)',
                                                padding : '12px',
                                                width : '100%',
                                                display : 'block',
                                                textAlign : 'center',
                                                fontSize : 15,
                                                fontWeight : 'bold'}}>
                                                View Campaign
                                            </a>
                                        </Link>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        )
                    })}
                    
                </Grid.Row>
            </Grid>
        )
        else{
            return(
                <div></div>
            )
        }
    }
}