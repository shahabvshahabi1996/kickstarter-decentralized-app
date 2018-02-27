import React , {Component} from 'react';
import { Form , Label , Grid , Button , Step , Input , Icon , Divider ,Select ,Checkbox ,TextArea} from 'semantic-ui-react';

const options = [
  { key: 'm', text: 'Arts', value: 'arts' },
  { key: 'f', text: 'Design & Tech', value: 'design' },
]


export default class NewCampaginForm extends Component{

    constructor(){
        super();
        this.state = { index : 0 , text : 'shahab project' }
    }

    increaseIndex() {
        let newIndex = this.state.index;
        newIndex = newIndex + 1;
        this.setState({index : newIndex})
        // console.log(this.state.index);
    }

    decreaseIndex(){
        let newIndex = this.state.index;
        newIndex = newIndex - 1;
        this.setState({index : newIndex})
    }

    render(){
        if(this.state.index == 0)
        return(
            <div>
                <Step.Group style={{borderRadius : 1.5}} fluid ordered stackable='tablet'>
                    <Step active>
                    {/* <Icon name='truck' /> */}
                        <Step.Content>
                            <Step.Title>General information</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                    {/* <Icon name='payment' /> */}
                        <Step.Content>
                            <Step.Title>About Campagin</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                    {/* <Icon name='info' /> */}
                        <Step.Content>
                            <Step.Title>Submit Campagin</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <div className="generalInfoForm">
                <h2>General information</h2>
                {/* <hr/> */}
                <Divider/>
                <Form>
                    <Form.Field>
                        <label>Campagin Name</label>
                        <input value={this.state.text} onChange={event => {this.setState({text : event.target.value})}} placeholder='Campagin Name' />
                    </Form.Field>
                    <Form.Field control={Select} label='Category' options={options} placeholder='Category' />
                    {/* <Button type='submit'>Submit</Button> */}
                    <Button onClick={this.increaseIndex = this.increaseIndex.bind(this)} floated="right" style={{borderRadius : 2,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)',color : '#fff',backgroundColor : '#416DEA'}}>Next</Button>
                    <br/><br/>
                </Form>
                </div>
            </div>
        )
        if(this.state.index == 1){
            return(
                <div>
                <Step.Group style={{borderRadius : 1.5}} fluid ordered stackable='tablet'>
                    <Step completed>
                    {/* <Icon name='truck' /> */}
                        <Step.Content>
                            <Step.Title>General information</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step active>
                    {/* <Icon name='payment' /> */}
                        <Step.Content>
                            <Step.Title>About Campagin</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                    {/* <Icon name='info' /> */}
                        <Step.Content>
                            <Step.Title>Submit Campagin</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <div className="AboutCampagin">
                    <h2>About Campagin</h2>
                    {/* <hr/> */}
                    <Divider/>
                    <Form>
                        <Form.Field>
                            <label>Write Any Thing You Want about your Campaign</label>
                            <TextArea autoHeight placeholder='Try adding multiple lines about your campagin and your goals' />
                        </Form.Field>
                        <Form.Field>
                            <label>Your Dreamy Budget for your Campagin</label>
                            <input placeholder='Campagin Name' />
                        </Form.Field>
                        <Button onClick={this.increaseIndex = this.increaseIndex.bind(this)} floated="right" style={{borderRadius : 2,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)',color : '#fff',backgroundColor : '#416DEA'}}>Next</Button>
                        <Button onClick={this.decreaseIndex = this.decreaseIndex.bind(this)} floated="left" style={{borderRadius : 2,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>Back</Button>
                        <br/><br/>
                    </Form>
                </div>
            </div>
            )
        }

        if(this.state.index == 2){
            return(
                <div>
                <Step.Group style={{borderRadius : 1.5}} fluid ordered stackable='tablet'>
                    <Step completed>
                    {/* <Icon name='truck' /> */}
                        <Step.Content>
                            <Step.Title>General information</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step completed>
                    {/* <Icon name='payment' /> */}
                        <Step.Content>
                            <Step.Title>About Campagin</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step active>
                    {/* <Icon name='info' /> */}
                        <Step.Content>
                            <Step.Title>Submit Campagin</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <div className="generalInfoForm">
                <h2>Submit Your Campagin</h2>
                {/* <hr/> */}
                <Divider/>
                <Form>
                    <Form.Field>
                        <label>Your Wallet Address</label>
                        <input placeholder='Wallet Address' />
                    </Form.Field>
                    <Form.Field>
                        <label>Your Minumum Contribution</label>
                        <Input labelPosition='right' label='ether' placeholder='Minimum Donate Budget' />
                    </Form.Field>
                    <Button onClick={this.decreaseIndex = this.decreaseIndex.bind(this)} floated="left" style={{borderRadius : 2,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)'}}>Back</Button>                    
                    <Button onClick={()=>{alert('this form is Done!')}} floated="right" style={{borderRadius : 2,boxShadow: '0px 10px 8px 0px rgba(0,0,0,0.2)',color : '#fff',backgroundColor : '#416DEA'}}>Done!</Button>
                    <br/><br/>
                </Form>
                </div>
            </div>
            )
        }
    }
}