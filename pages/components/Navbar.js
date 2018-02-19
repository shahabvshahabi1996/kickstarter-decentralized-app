import React , {Component} from "react";
import { Button, Card, Grid , Divider , Menu , Container , Image , Icon , Popup , Label } from 'semantic-ui-react';
import Header from './Header';
export default class Navbar extends Component{
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
        <div>
          <Header/>
          <Menu style={{boxShadow : 'none',borderRadius : 0,margin : 0,padding : '.5%'}}>
            <Menu.Item name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick}>
              Explore
            </Menu.Item>
    
            <Menu.Item name='submit' active={activeItem === 'submit'} onClick={this.handleItemClick}>
              Start A Project
            </Menu.Item>
    
            <Menu.Menu style={{border : '0'}} position='right'>
              <Menu.Item name='signup' active={activeItem === 'signup'} onClick={this.handleItemClick}>
              Sign Up
              </Menu.Item>
    
              <Menu.Item name='help' active={activeItem === 'help'} onClick={this.handleItemClick}>
              Search
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </div>
      )
    }
}