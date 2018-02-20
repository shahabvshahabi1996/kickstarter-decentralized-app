import React , {Component} from 'react';
import { Button, Card, Grid , Divider , Container , Image , Icon , Popup } from 'semantic-ui-react';

import SimpleCard from './SimpleCards';

export default class TopCampaigns extends Component {
    render(){
        return(
            <div>
                <h1>This Week Top Campaigns<span><Button floated="right" icon labelPosition='right'>View All <Icon name='right arrow' /> </Button></span></h1>
                <Divider />
                <Grid className="CampaignKeeper" style={{marginTop : '10px'}} columns={2}>
                        <Grid.Row>
                            <Grid.Column mobile={16} computer={7} largeScreen={7} widescreen={7} tablet={16} width={7}>
                            <div className="ui fluid image">
                                <Image fluid style={{marginBottom : '15px'}}  src='https://placeholdit.co//i/580x580?bg=eeeeee'/>
                                <div style={{position: 'absolute', bottom: '15%',left : '5%', width: '100%', height: 'auto'}}>
                                    <h2 style={{backgroundColor : "#ffff",padding : '5px',width : '50%'}}>{this.props.datas[0].name}</h2>
                                    <p style={{backgroundColor : "#ffff",padding : '5px',width : '20%'}}>{this.props.datas[0].budget} funded</p>
                                </div>
                                <div style={{position: 'absolute', top: '2%',left : '92%', width: '100%', height: 'auto'}}>
                                    <Popup
                                    trigger={<a style={{color : '#252525'}} href="#"><Icon style={{backgroundColor : 'transparent'}} name='heart outline' size='large' /></a>}
                                    content='Archive it'
                                    position='top center'
                                    />
                                </div>
                            </div>    
                            </Grid.Column>
                            <Grid.Column style={styles.textHeaderStyle} mobile={16} computer={9} largeScreen={9} widescreen={9} tablet={16}  width={9}>
                                <SimpleCard datas={this.props.datas}/>
                            </Grid.Column>
                        </Grid.Row>
                </Grid>
            </div>    
        )
    }
}

const styles = {
    textHeaderStyle : {
        overflowY : 'scroll',
        maxHeight : '480px'
    }
}
