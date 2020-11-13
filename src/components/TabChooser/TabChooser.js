import React, {Component} from 'react';
import './TabChooser.css';

export default class TabChooser extends Component {

    state = {
        selected: this.props.selected,
        valueUpdated: this.props.valueUpdated,
    }

    // Select the clicked item
    updateSelected = (e) => {
        this.setState({ selected: e.target.getAttribute("item-index") });
        if (this.state.valueUpdated != null) {
            this.state.valueUpdated(e.target.getAttribute("item-index"));
        }
    }

    render() {
        return (
        <div id="TabChooser">
        <div id="tabchooser-first" item-index={0} className={this.state.selected === 0 ? "tabchooser-selected": ""} onClick={this.updateSelected}><span item-index={0}>{this.props.left}</span></div>
        <div id="tabchooser-last" item-index={1} className={this.state.selected === 1 ? "tabchooser-selected": ""} onClick={this.updateSelected}><span item-index={1}>{this.props.right}</span></div>
        </div>
        );
    }
}
