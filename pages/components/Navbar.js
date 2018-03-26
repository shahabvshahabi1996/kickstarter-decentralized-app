import React , {Component} from "react";
import { Button, Card, Grid , Divider , Menu , Input , Container , Image , Icon , Popup , Label , Dropdown } from 'semantic-ui-react';
import Header from './Header';
import {Router} from '../../routes';
import jwt from 'jsonwebtoken';
// import '../styles/App.css';

export default class Navbar extends Component{
    state = {
      token : undefined,
      exp : undefined
    }

    handleItemClick = (e, { name }) => {
      Router.replace(`${name}`);
      this.setState({ activeItem: name });
    } 

    logOut = async ()=>{
      let { token } = this.state;
      console.log(token);
      const res = await fetch('http://localhost:8000/logout',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token
            })
      });
      const result = await res.json();
      if(result.status == 'success'){
        this.setState({token : undefined});
        localStorage.removeItem('token');
        Router.push('/'); 
      }

      else{
        alert('there is problem while logging out');
      }
    }

    componentDidMount(){
      const token = localStorage.getItem('token');
      let exp;
      let name;
      if(token){
        try{
          const decoded = jwt.verify(token , 'secretkey');
          exp = decoded.exp * 1000;
          name = decoded.data.name;
        } catch(e){
          exp = null;
          name = null;
        }
        this.setState({exp,name}); 
      }
      
      this.setState({token});
    }

    render() {
      const { activeItem , token , name , exp } = this.state;
      if(token && exp > new Date().getTime())
      return (
          <Menu borderless stackable style={{padding : '5px',borderRadius : 0,marginTop:0,borderColor : '#eee',boxShadow: '0px 12px 8px 0px rgba(0,0,0,0.2)',borderWidth : 1,borderStyle : 'solid',padding : '0px'}}>
            <Header/>
            <Menu.Item name='/' active={activeItem === '/'} onClick={this.handleItemClick}>
              <h2>KickStarter</h2>
            </Menu.Item>
            <Menu.Item name='/explore' active={activeItem === '/explore'} onClick={this.handleItemClick}>
            <h4>Explore</h4>
            </Menu.Item>
            <Menu.Item name='/campaigns/new' active={activeItem === '/campaigns/new'} onClick={this.handleItemClick}>
              <h4>Start a campaign</h4>
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item>
              <Popup
                trigger={<Input icon='search' placeholder='Search...' />}
                header='Campaign Search'
                content='Look for your dreamy project,and make it alive!'
                on='focus'/>
              </Menu.Item>
              <Menu.Item name={`/profile/${this.state.token}`} active={activeItem === '/profile'} >
              <Dropdown text={`${this.state.name}`} style={{fontWeight : 'bold'}} pointing='down' className='link item'>
                <Dropdown.Menu>
                  <Dropdown.Item>profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={this.logOut}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
      )

    else{
      return(
        <Menu borderless stackable style={{padding : '5px',borderRadius : 0,marginTop:0,borderColor : '#eee',boxShadow: '0px 12px 8px 0px rgba(0,0,0,0.2)',borderWidth : 1,borderStyle : 'solid',padding : '0px'}}>
            <Header/>
            <Menu.Item name='/' active={activeItem === '/'} onClick={this.handleItemClick}>
              <h2>KickStarter</h2>
            </Menu.Item>
            <Menu.Item name='/explore' active={activeItem === '/explore'} onClick={this.handleItemClick}>
            <h4>Explore</h4>
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item>
              <Popup
                trigger={<Input icon='search' placeholder='Search...' />}
                header='Campaign Search'
                content='Look for your dreamy project,and make it alive!'
                on='focus'/>
              </Menu.Item>
              <Menu.Item name='/login' active={activeItem === '/login'} onClick={this.handleItemClick}>
                <h4>Sign In</h4>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
      )
    }  
    }
}