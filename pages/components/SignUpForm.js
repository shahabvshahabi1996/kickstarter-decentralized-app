import React , {Component} from 'react';
import { Button, Checkbox, Form , Divider } from 'semantic-ui-react'

export default class SignUpForm extends Component{
    render(){
        return(
            <Form>
                <h1>Sign Up</h1>
                <hr/>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='john doe' />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='hello@example.com' />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                    <label>Re-enter password</label>
                    <input placeholder='Last Name' />
                </Form.Field>
                <Button fluid style={{borderRadius : 2,color : '#fff',backgroundColor : '#416DEA',boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)'}}>
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