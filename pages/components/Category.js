import React , {Component} from 'react';
import { Dropdown } from 'semantic-ui-react';


export default class Category extends Component{
    render(){
        return(
            <Dropdown text='Design & Tech' floating>
                <Dropdown.Menu fluid>
                    <Dropdown.Item text='New' />
                    <Dropdown.Item text='Open...' description='ctrl + o' />
                    <Dropdown.Item text='Save as...' description='ctrl + s' />
                    <Dropdown.Item text='Rename' description='ctrl + r' />
                    <Dropdown.Item text='Make a copy' />
                    <Dropdown.Item icon='folder' text='Move to folder' />
                    <Dropdown.Item icon='trash' text='Move to trash' />
                    <Dropdown.Divider />
                    <Dropdown.Item text='Download As...' />
                    <Dropdown.Item text='Publish To Web' />
                    <Dropdown.Item text='Comics & Illustration' />
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}