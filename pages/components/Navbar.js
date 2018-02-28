import React , {Component} from "react";
import { Button, Card, Grid , Divider , Menu , Input , Container , Image , Icon , Popup , Label , Dropdown } from 'semantic-ui-react';
import Header from './Header';
import Router from 'next/router'
// import '../styles/App.css';

export default class Navbar extends Component{
    state = {}

    handleItemClick = (e, { name }) => {
      console.log(name);
      Router.replace(`http://localhost:3000${name}`);
      this.setState({ activeItem: name });
    }
  
    render() {
      const { activeItem } = this.state
  
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
              <Menu.Item name='/login' active={activeItem === '/login'} onClick={this.handleItemClick}>
                <h4>Sign In</h4>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
      )
    }
}