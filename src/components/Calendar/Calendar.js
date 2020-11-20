import React, {Component} from 'react';
import DragFillGrid from '../DragFillGrid/DragFillGrid';
import TabChooser from '../TabChooser/TabChooser';
import './Calendar.css';

export default class Calendar extends Component {
  state = {
    month: this.props.month,
    year: this.props.year,
    day: this.props.day,

    calendarChoice: 0,

    timeblocksinput: this.props.timeblocksinput,
    timeblocksoutput: null, // This will contain the availability inputs

    rowheaders: ["00:00", "01:00", "02:00", "03:00", "04:00",
                "05:00", "06:00", "07:00", "08:00", "09:00",
                "10:00", "11:00", "12:00", "13:00", "14:00",
                "15:00", "16:00", "17:00", "18:00", "19:00",
                "20:00", "21:00", "22:00", "23:00"],
    colheaders: ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"],
    submitcallback: this.props.submitcallback,
    cancelcallback: this.props.cancelcallback,
  }

  getHeader() {
    if (this.props.inputmode == true)
      return (<h3 id="cleandar-header-title">{this.props.inputmodeheader}</h3>)
    else
      return (<TabChooser left={"Team"} right={"Personal"} selected={0} valueUpdated={ calendarChoice => this.setState({ calendarChoice }) }></TabChooser>);
  }

  // getDragFillGrid() {
  //   if (this.state.calendarChoice == 0) { // Choose team calendar
  //     return (<DragFillGrid rowheaders={this.state.rowheaders}
  //               colheaders={this.state.colheaders}
  //               rownum={24}
  //               colnum={7}
  //               timeBlocksUpdated={ timeblocksoutput => this.setState({ timeblocksoutput }) }
  //               draggable={this.props.inputmode}
  //               blockcellsinput={[this.state.timeblocksinput[0]]}>
  //             </DragFillGrid>)
  //   }
  //   else { // Choose personal calendar
  //     return (<DragFillGrid rowheaders={this.state.rowheaders}
  //               colheaders={this.state.colheaders}
  //               rownum={24}
  //               colnum={7}
  //               timeBlocksUpdated={ timeblocksoutput => this.setState({ timeblocksoutput }) }
  //               draggable={false}
  //               blockcellsinput={[this.state.timeblocksinput[1]]}>
  //             </DragFillGrid>)
  //   }
  // }

  /* Important props
  {
    inputmode - whether the calendar can drag time blocks
    inputmodeheader - the text on top when inputmode is true
  } */

  render() {
    return (
    <div id="Calendar">
      <div id="calendar-header">
        <div id="calendar-month-year-container">
          <img src={require('./img/left_arrow.png')} alt=""/>
          <h3 id="calendar-month">{this.state.month} <span id="calendar-year">{this.state.year}</span></h3>
          <img src={require('./img/right_arrow.png')} alt=""/>
        </div>
        <div id="calendar-chooser-container">
          {this.getHeader()}
        </div>
        <div id="calendar-header-spacer"></div>
      </div>
      <div id="calendar-grid">
        <DragFillGrid rowheaders={this.state.rowheaders}
                      colheaders={this.state.colheaders}
                      rownum={24}
                      colnum={7}
                      timeBlocksUpdated={ timeblocksoutput => this.setState({ timeblocksoutput }) }
                      draggable={this.props.inputmode}
                      blockcellsinput={[this.state.timeblocksinput[0]]}>
        </DragFillGrid>
      </div>
      <div id="calendar-footer" style={{visibility: (this.props.inputmode == true) ? "visible": "hidden" }}>
        <div id="timeblock-cancel-button" onClick={() => { this.state.cancelcallback() }}>Cancel</div>
        <div id="timeblock-submit-button" onClick={() => { this.state.submitcallback(this.state.timeblocksoutput, this.state.calendarChoice) }}>Submit</div>
      </div>
    </div>
    );
  }
}
