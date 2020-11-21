import React, {Component} from 'react';
import DragFillGrid from '../DragFillGrid/DragFillGrid';
import TabChooser from '../TabChooser/TabChooser';
import './Calendar.css';

export default class Calendar extends Component {
  state = {
    month: this.props.month,
    year: this.props.year,
    day: this.props.day,

    tabchoice: 0,
    calendarchoice: this.props.calendarchoice ? this.props.calendarchoice : 0,

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
      return (<TabChooser left={"Team"} right={"Personal"} selected={0} valueUpdated={ tabchoice => this.setState({ tabchoice }) }></TabChooser>);
  }

  getDragFillGrid() {

    // console.log(this.props.calendarchoice)

    var team, personal, input;
    if (this.props.inputmode == 1) {
      input = "block";
      team = personal = "none";
    }
    else {
      if (this.state.tabchoice == 0) {
        team = "block";
        input = personal = "none";
      }
      else if (this.state.tabchoice == 1) {
        personal = "block";
        input = team = "none";
      }
    }
      return (<div>
                <div style={{display: team}}>
                  <DragFillGrid
                    id={1}
                    rowheaders={this.state.rowheaders}
                    colheaders={this.state.colheaders}
                    rownum={24}
                    colnum={7}
                    timeBlocksUpdated={ timeblocksoutput => this.setState({ timeblocksoutput }) }
                    draggable={false}
                    blockedcellsinput={[this.state.timeblocksinput[0][this.props.calendarchoice]]}>
                  </DragFillGrid>
                </div>
                <div style={{display: personal}}>
                  <DragFillGrid
                    id={2}
                    rowheaders={this.state.rowheaders}
                    colheaders={this.state.colheaders}
                    rownum={24}
                    colnum={7}
                    timeBlocksUpdated={ timeblocksoutput => this.setState({ timeblocksoutput }) }
                    draggable={false}
                    blockedcellsinput={[this.state.timeblocksinput[1]]}>
                  </DragFillGrid>
                </div>
                <div style={{display: input}}>
                  <DragFillGrid
                    id={1}
                    rowheaders={this.state.rowheaders}
                    colheaders={this.state.colheaders}
                    rownum={24}
                    colnum={7}
                    timeBlocksUpdated={ timeblocksoutput => this.setState({ timeblocksoutput }) }
                    draggable={true}
                    blockedcellsinput={[this.state.timeblocksinput[1]]}>
                  </DragFillGrid>
                </div>
              </div>);
  }

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
        {this.getDragFillGrid()}
      </div>
      <div id="calendar-footer" style={{visibility: (this.props.inputmode == true) ? "visible": "hidden" }}>
        <div id="timeblock-cancel-button" onClick={() => { this.state.cancelcallback() }}>Cancel</div>
        <div id="timeblock-submit-button" onClick={() => { this.state.submitcallback(this.state.timeblocksoutput, this.state.tabchoice) }}>Submit</div>
      </div>
    </div>
    );
  }
}
