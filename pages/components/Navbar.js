import React , {Component} from "react";
import { Button, Card, Grid , Divider , Menu , Input , Container , Image , Icon , Popup , Label } from 'semantic-ui-react';
import Header from './Header';

// import '../styles/App.css';

export default class Navbar extends Component{
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
          <Menu borderless stackable style={{padding : '5px',borderRadius : 0,marginTop:0,borderColor : '#eee',boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.15)',borderWidth : 1,borderStyle : 'solid',padding : '0px'}}>
            <Header/>
            <Menu.Item>
              <h2>KickStarter</h2>
            </Menu.Item>
            <Menu.Item name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick}>
            <h4>Explore</h4>
            </Menu.Item>
            <Menu.Item name='submit' active={activeItem === 'submit'} onClick={this.handleItemClick}>
              <h4>Start a project</h4>
            </Menu.Item>

            <Menu.Menu position='right'>
              <Menu.Item>
              <Popup
                trigger={<Input icon='search' placeholder='Search...' />}
                header='Campaign Search'
                content='Look for your dreamy project,and make it alive!'
                on='focus'/>
              </Menu.Item>
              <Menu.Item name='help' active={activeItem === 'help'} onClick={this.handleItemClick}>
                <h4>Sign In</h4>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
      )
    }
}