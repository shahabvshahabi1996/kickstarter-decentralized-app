import React , {Component} from 'react';
import GridColumn, { Grid , Form , Button } from 'semantic-ui-react';
import GridRow from 'semantic-ui-react';

export default class Footer extends Component {
    render(){
        return(
            <div>
                <div className="part1">
                    <Grid stackable columns={4}>
                        <Grid.Row>  
                            <Grid.Column>
                                <ul style={{listStyleType: 'none'}}><h4>ABOUT</h4>
                                    <li><a href="#">About us</a></li>
                                    <li><a href="#">Our charter</a></li>
                                    <li><a href="#">Stats</a></li>
                                    <li><a href="#">Press</a></li>
                                    <li><a href="#">Jobs</a></li>
                                </ul>
                            </Grid.Column>
                            <Grid.Column>
                                <ul style={{listStyleType: 'none'}}><h4>HELP</h4>
                                    <li><a href="#">Help Center</a></li>
                                    <li><a href="#">Campus</a></li>
                                    <li><a href="#">Creator Handbook</a></li>
                                    <li><a href="#">Our Rules</a></li>
                                    <li><a href="#">Support</a></li>
                                </ul>
                            </Grid.Column>
                            <Grid.Column>
                                <ul style={{listStyleType: 'none'}}><h4>HELLO</h4>
                                    <li><a href="#">Kickstarter Blog</a></li>
                                    <li><a href="#">Engineering Blog</a></li>
                                    <li><a href="#">Newsletters</a></li>
                                </ul>
                            </Grid.Column>
                            <Grid.Column>
                                <ul style={{listStyleType: 'none'}}><h4>MORE FROM KICKSTARTER</h4>
                                    <li><a href="#">Drip</a></li>
                                    <li><a href="#">Kickstarter Live</a></li>
                                    <li><a href="#">The Creative Independent</a></li>
                                </ul>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
                <div className="part2" style={{borderTopColor : '#eee',borderTopWidth : 1,borderTopStyle : 'solid',padding : '5px',paddingTop : '15px'}}>
                    <Grid stackable columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <h3>Kickstarter © 2018</h3>
                                <p>Our Socila NetWroks</p>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Join Our NewsLetter</h3>
                                <Grid columns={2}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Form>
                                                <Form.Input placeholder='joe@schmoe.com' />
                                            </Form>  
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Button style={{boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.1)'}}>Submit</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        )
    }
}