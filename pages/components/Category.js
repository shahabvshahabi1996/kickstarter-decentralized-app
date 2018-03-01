import React , {Component} from 'react';
import { Dropdown } from 'semantic-ui-react';


export default class Category extends Component{

    constructor(){
        super();
        this.state = {
            cat : 'Categories'
        }
    }

    selectCat(event , {text}){
        this.props.selected(text);
        this.setState({cat : text});
    }

    render(){
        return(
            <Dropdown text={this.state.cat} floating>
                <Dropdown.Menu fluid>
                    <Dropdown.Item onClick={this.selectCat = this.selectCat.bind(this)} text='Arts' />
                    <Dropdown.Item onClick={this.selectCat = this.selectCat.bind(this)} text='Games' />
                    <Dropdown.Item onClick={this.selectCat = this.selectCat.bind(this)} text='Food & Craft' />
                    <Dropdown.Item onClick={this.selectCat = this.selectCat.bind(this)} text='Publishing' />
                    <Dropdown.Item onClick={this.selectCat = this.selectCat.bind(this)} text='Comics & Illustration' />
                    <Dropdown.Item onClick={this.selectCat = this.selectCat.bind(this)} text='Music'  />
                    <Dropdown.Item onClick={this.selectCat = this.selectCat.bind(this)} text='Design & Tech' />
                    <Dropdown.Item onClick={this.selectCat = this.selectCat.bind(this)} text='Film' />
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}