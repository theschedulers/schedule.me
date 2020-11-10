import React, {Component} from 'react';
import './ListSelect.css';

export default class ListSelect extends Component {

  state = {
    list: this.props.list,
    header: this.props.header,
    onAdd: this.props.onAdd,
    selected: 0,
  }

  updateSelected = (e) => {
    this.setState({ selected: e.target.getAttribute("item-index") });
  }

  render() {
    return (
      <div id="list-select-container">
          <div id="list-select-header">
            <h6>{this.state.header}</h6>
            <img id="list-select-plus-icon" src={require('./img/plus.png')} onClick={this.state.onAdd}/>
          </div>
          <div id="list-select-list">
            {this.state.list && this.state.list.map((item, index) => {
              return <div key={index} item-index={index} className={this.state.selected == index ? "list-select-item list-select-selected" : "list-select-item"} onClick={this.updateSelected}>
                <img class="list-select-item-img" src={require('./img/plus.png')}/>
                <div item-index={index}>
                  <h6 item-index={index}>{item.text}</h6>
                  <p item-index={index}>{item.subtext}</p>
                </div>
              </div>
            })}
          </div>
      </div>
    );
  }
}