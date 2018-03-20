import React , {Component} from 'react';
import { Button, Checkbox, Form , Divider } from 'semantic-ui-react'

export default class SignUpForm extends Component{
    constructor(){
        super();
        this.state = {
            name : '',
            email : '',
            password : '',
            repassword : '',
            message : ''
        }
    }

    async sumbitForm(){
        const { name , email , password , repassword } = this.state;
        console.log(this.state);
        if(name.length > 0 && email.length > 0 && password === repassword){
                const res = await fetch('http://localhost:8000/signup', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                           name ,
                           email,
                           password,
                           repassword
                        })
                    });

                const response = await res.json();
                if(response.status == 'success'){
                    localStorage.setItem("token" , `${response.token}`);
                    //redirect it to the admin or some where like that
                    const token = await localStorage.getItem('token')
                    console.log(token);  
                }
                else{
                    this.setState({message : response.message})
                }
        }
        else{
            alert("plz fill the form with valid inputs");
        }
    }

    render(){
        return(
            <Form>
                <h1>Sign Up</h1>
                <hr/>
                <Form.Field>
                    <label>Name</label>
                    <input value={this.state.name} onChange={event => this.setState({[event.target.name] : event.target.value})} name="name" placeholder='john doe' />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input type="email" placeholder='hello@example.com' value={this.state.email} onChange={event => this.setState({[event.target.name] : event.target.value})} name="email" />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Last Name' value={this.state.password} onChange={event => this.setState({[event.target.name] : event.target.value})} name="password" />
                </Form.Field>
                <Form.Field>
                    <label>Re-enter password</label>
                    <input placeholder='Last Name' value={this.state.respassword} onChange={event => this.setState({[event.target.name] : event.target.value})} name="repassword" />
                </Form.Field>
                <Button onClick={this.sumbitForm = this.sumbitForm.bind(this)} fluid style={{borderRadius : 2,color : '#fff',backgroundColor : '#416DEA',boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)'}}>
                    Sign Up
                </Button>
                <h5 style={{textAlign : 'center'}}>By signing up, you agree to our <span><a>terms of use</a></span>, <span><a>privacy policy</a></span>, and <span><a>cookie policy.</a></span></h5>
                <Form.Field>
                    <Divider/>
                    <h4 style={{textAlign : 'center'}}>Have an Account ? <span><a href="/login">Login</a></span></h4>
                </Form.Field>
            </Form>
        )
    }
}