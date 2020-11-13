import React, {Component} from 'react';
import './ListSelect.css';

export default class ListSelect extends Component {

  state = {
    header: this.props.header,
    onAdd: this.props.onAdd,
    selectable: this.props.selectable,
    selected: this.props.selectable,
    valueUpdated: this.props.valueUpdated,
  }

  // Select the clicked item
  updateSelected = (e) => {
    if (this.state.selectable != null) {
      this.setState({ selected: e.target.getAttribute("item-index") });
      this.state.valueUpdated(e.target.getAttribute("item-index"));
    }
  }

  render() {
    return (
      <div id="list-select-container">
          <div id="list-select-header">
            <h6>{this.state.header}</h6>
            <img id="list-select-plus-icon" src={require('./img/plus.png')} alt="" onClick={this.state.onAdd}/>
          </div>
          <div id="list-select-list">
            {this.props.list && this.props.list.map((item, index) => {
              return <div key={index}
                          item-index={index}
                          className={this.state.selected === index ? "list-select-item list-select-selected" : "list-select-item"}
                          onClick={this.updateSelected}>
                <img className="list-select-item-img" src={require('./img/defaultprofile.png')}  alt="list-select-item-img-alt"/>
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