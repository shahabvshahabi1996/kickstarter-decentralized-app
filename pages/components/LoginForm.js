import React , {Component} from 'react'
import { Button, Checkbox, Form , Divider } from 'semantic-ui-react'

export default class LoginForm extends Component{
    render(){
        return(
            <Form>
                <h1>Sign In</h1>
                <hr/>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='john@example.com' />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='password' />
                    <label floated="right"><a href="#">Forgot password ?</a></label>
                </Form.Field>
                <Button fluid style={{borderRadius : 2,color : '#fff',backgroundColor : '#416DEA',boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)'}}>
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

