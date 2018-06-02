import React , {Component} from 'react'
import { Button, Checkbox, Form , Divider } from 'semantic-ui-react';
import { Router } from '../../routes';
import jwt from 'jsonwebtoken';

export default class LoginForm extends Component{
    constructor(){
        super();
        this.state = {
            email : '',
            password : ''
        }
    }

    componentDidMount(){
        let Const = false;
        try {
            const token = localStorage.getItem('token');
            jwt.verify(token,'secretkey');
            Const = true;
        } catch(e){
            console.log(e);
            Const = false;
        }

        if(Const) {
            Router.push('/');
        }
    }

    async onSubmit(){
        const { password , email } = this.state;
        this.setState({loading : true});
        if(password.length > 0 && email.length > 0){
            const res = fetch('http://localhost:8000/login', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            password ,
                            email
                        })
                    }).then((response) => {
                        return response.json()
                    }).then((res) => {
                        if(res.token){
                            localStorage.setItem('token',res.token);
                            Router.push('/');
                        } else {
                            this.props.toast('error',res.message);
                            this.setState({loading : false});
                        }
                    }).catch(e => {
                            this.props.toast('error','Something went wrong!');
                            this.setState({loading : false});
                    })
        }

        else{
            this.props.toast('error','plz fill the form validly');
            this.setState({loading : false});
        }
    }
    render(){
        const {loading} = this.state;
        return(
            <Form>
                <h1>Sign In</h1>
                <hr/>
                <Form.Field>
                    <label>Email</label>
                    <input value={this.state.email} name="email" onChange={(event) => {this.setState({[event.target.name] : event.target.value})}} placeholder='john@example.com' />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input value={this.state.password} name="password" onChange={(event) => {this.setState({[event.target.name] : event.target.value})}} placeholder='password' />
                    <label floated="right"><a href="/forgot/password">Forgot password ?</a></label>
                </Form.Field>
                <Button loading={loading} onClick={this.onSubmit = this.onSubmit.bind(this)} fluid style={{borderRadius : 2,color : '#fff',backgroundColor : '#416DEA',boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)'}}>
                    Log in
                </Button>
                <Form.Field>
                    <Divider/>
                    <h4 style={{textAlign : 'center'}}><span>New To Kickstarter ? <a href="/signup">Sign Up</a></span></h4>
                </Form.Field>
            </Form>
        )
    }
} 

