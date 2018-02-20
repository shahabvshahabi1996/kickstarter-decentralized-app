import React, { Component } from 'react'
import { Button, Progress } from 'semantic-ui-react'

export default class ProgressBar extends Component {
  state = { percent: 20 }

//   increment = () => this.setState({
//     percent: this.state.percent >= 100 ? 0 : this.state.percent + 20,
//   })
  render() {
    return (
      <div>
        <Progress size="tiny" color="blue" percent={this.props.percent}  />
      </div>
    )
  }
}