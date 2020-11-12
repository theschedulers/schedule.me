import React, {Component} from 'react';
import DragFillGrid from '../DragFillGrid/DragFillGrid';
import TabChooser from '../TabChooser/TabChooser';
import './Calendar.css';

export default class Calendar extends Component {
  state = {
    month: this.props.month,
    year: this.props.year,
    day: this.props.day,

    choice: null,
  }
  render() {

    // console.log(this.state.choice);

    return (
    <div id="Calendar">
      <div id="calendar-header">
        <div id="calendar-month-year-container">
          <img src={require('./img/left_arrow.png')}/>
          <h3 id="calendar-month">{this.state.month} <span id="calendar-year">{this.state.year}</span></h3>
          <img src={require('./img/right_arrow.png')}/>
        </div>
        <div id="calendar-chooser-container">
          <TabChooser left={"Team"} right={"Personal"} selected={0} valueUpdated={ choice => this.setState({ choice }) }></TabChooser>
        </div>
        <div id="calendar-header-spacer"></div>
      </div>
      <div id="calendar-grid">
        <DragFillGrid></DragFillGrid>
      </div>
    </div>
    );
  }
}
