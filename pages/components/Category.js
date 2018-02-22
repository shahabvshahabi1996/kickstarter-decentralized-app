import React , {Component} from 'react';
import { Dropdown } from 'semantic-ui-react';


export default class Category extends Component{
    render(){
        return(
            <Dropdown text='Design & Tech' floating>
                <Dropdown.Menu fluid>
                    <Dropdown.Item text='Arts' />
                    <Dropdown.Item text='Games' />
                    <Dropdown.Item text='Food & Craft' />
                    <Dropdown.Item text='Publishing' />
                    <Dropdown.Item text='Comics & Illustration' />
                    <Dropdown.Item text='Music'  />
                    <Dropdown.Item text='Design & Tech' />
                    <Dropdown.Item text='Film' />
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}