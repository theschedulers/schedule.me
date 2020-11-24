import React, {Component} from 'react';
import './ListSelect.css';

export default class ListSelect extends Component {

  state = {
    id: this.props.id,
    header: this.props.header,
    onAdd: this.props.onAdd,
    selectable: this.props.selectable,
    selected: this.props.id + this.props.selected,
    hovered: null,
    valueUpdated: this.props.valueUpdated,
  }

  // Select the clicked item
  updateSelected = (e) => {
    const selectedIndex = e.target.getAttribute("item-index");
    if (this.state.selectable != null && selectedIndex != null) {
      this.setState({ selected: e.target.getAttribute("item-index") });
      this.state.valueUpdated(e.target.getAttribute("item-index").replace(this.state.id, ''));
    }
  }

  removeListItem = (e) => {

    const selected = e.target.getAttribute("item-remove-index");

    if (selected != null && this.props.removeCallback != null) {
      this.props.removeCallback(selected.replace(this.state.id, ''));
    }
  }

  showRemoveIcon = (e) => {
    this.setState({ hovered: e.target.getAttribute("item-index")})
  }

  hideRemoveIcon = (e) => {
    this.setState({ hovered: null })
  }

  //temp
  //require('./img/defaultprofile.png')

  render() {

    var id = this.state.id;

    return (
      <div id="list-select-container">
          <div id="list-select-header">
            <h6>{this.state.header}</h6>
            <img id="list-select-plus-icon" src={require('./img/plus.png')} alt="" onClick={this.state.onAdd}/>
          </div>
          <div id="list-select-list">
            {this.props.list && this.props.list.map((item, index) => {
              return <div key={id + index}
                          item-index={id + index}
                          className={this.state.selected == (id + index) ? "list-select-item list-select-selected" : "list-select-item"}
                          onClick={this.updateSelected}
                          onMouseEnter={this.showRemoveIcon}
                          onMouseLeave={this.hideRemoveIcon}
                          >
                <img key={id + index} item-remove-index={id + index} src={require('./img/remove.png')} className="list-select-remove-icon"
                      onClick={this.removeListItem}
                      style={{
                        visibility: this.state.hovered == (id + index) ? "visible" : "hidden"
                      }}
                      />
                <section className="list-select-item-img-container">
                  <img className="list-select-item-img" src={item.photo || ""}  alt="list-select-item-img-alt"/>
                </section>
                <div item-index={id + index} style={{ overflow: "auto" }}>
                  <h6 item-index={id + index}>{item.text}</h6>
                  <p item-index={id + index}>{item.subtext}</p>
                </div>
              </div>
            })}
          </div>
      </div>
    );
  }
}