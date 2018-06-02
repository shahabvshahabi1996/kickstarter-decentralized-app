import React , {Component} from 'react';
import { Button, Checkbox, Form , Divider } from 'semantic-ui-react'


export default class ForgotPasswordForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            email : '',
            loading : false
        }
    }

    onSubmit = async() => {
        const { email } = this.state;
        this.setState({loading : true});
        // calling API
        if(email.length > 0) {
            const response = fetch('http://localhost:8000/forgot/password', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email
                        })
                    }).then((response) => {
                        return response.json()
                    }).then((res) => {
                        if(res.status == 'err')
                            this.props.toast('error','There is no Email address like that!')
                        else
                            this.props.toast('success','Your Password Has Sent To your Email Account!')
                        this.setState({loading : false});                                    
                    }).catch(e => {
                        this.setState({loading : false});            
                        this.props.toast('error','Something Went Wrong While Proccess!')                        
                    });            
        } else {
            this.props.toast('error','Plz Enter a email address!')            
            this.setState({loading : false});
        } 
    }

    render(){
        return(
            <Form>
                <h1>Forgot Password</h1>
                <hr/>
                <Form.Field>
                    <label>Email</label>
                    <input value={this.state.email} name="email" onChange={(event) => {this.setState({[event.target.name] : event.target.value})}} placeholder='john@example.com' />
                </Form.Field>
                <Button loading={this.state.loading} onClick={this.onSubmit = this.onSubmit} fluid style={{borderRadius : 2,color : '#fff',backgroundColor : '#416DEA',boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)'}}>
                    Send
                </Button>
                <Form.Field>
                    <Divider/>
                    <h4 style={{textAlign : 'center'}}><span>Didn't Forget it ? <a href="/login">Login</a></span></h4>
                </Form.Field>
            </Form>
        )
    }
}