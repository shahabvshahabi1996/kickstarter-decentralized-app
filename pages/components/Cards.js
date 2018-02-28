import React , {Component} from 'react';
import { Button, Card, Grid , Divider , Container , Image , Icon , Popup } from 'semantic-ui-react';

import ProgressBar from './ProgressBar';
import LikeButton from './LikeButton';

import web3 from '../../web3';

export default class Cards extends Component{
    
    constructor(){
        super();
        this.state = {
            datas : undefined
        }
    }

    async componentDidMount(){
        await this.setState({datas : this.props.datas})
    }

    render(){
        var {datas} = this.state;
        if(datas != undefined)
        return(
            <Grid stackable>
                <Grid.Row columns={3}>
                    {datas.map((data,index)=>{
                        return(
                            <Grid.Column key={index}>
                                <Card fluid style={{marginTop : '10px',marginBottom : '10px',borderRadius : 1 ,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>
                                    <div className="ui fluid image">
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
                                        <Button onClick={()=>{alert(data.campaignAddress)}} fluid style={{borderRadius : 2,color : '#fff',backgroundColor : '#416DEA',boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)'}}>
                                            View Campaign
                                        </Button>
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