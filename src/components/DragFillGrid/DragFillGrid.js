import React, {Component} from 'react';
import './DragFillGrid.css';
class DragFillGrid extends Component {

    getRowCol = (e) => {
        var row = e.target.getAttribute("row");
        var col = e.target.getAttribute("column")
        console.log(row);
        console.log(col);
    }
    // Source: https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
    createTable = () => {
        let table = []
        for (let i = 0; i < 24; i++) {
            let children = []
            
            for (let j = 0; j < 7; j++) {  
                children.push(<td key={"rc" + i + "" + j} row={i} column={j} onClick={this.getRowCol}></td>)
            }
            table.push(<tr key={"r" + i}>{children}</tr>)
        }
        return table
    }

    createTimeElements = () => {
        let times = []
        for (let i = 0; i < 24; i++) {
            times.push(<span className={"calendar-time"} key={"times" + i}>{i + ":00"}</span>);
        }
        return times;
    }

    handleScroll = (e) => {
        if (e.target.getAttribute('id') == "dragfillgrid-grid-div")
            document.getElementById("dragfillgrid-grid-side-info").scrollTop = e.target.scrollTop;
    }
    
    render() {
        return (
        <div id="DragFillGrid">
            <div id="dragfillgrid-header-titles">
                {/* 7 static column headers */}
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thurs</span>
                <span>Fri</span>
                <span>Sat</span>
            </div>
            <div id="dragfillgrid-grid-container">
                {/* Collection of cells: 24 * 7 cells */}
                <div id="dragfillgrid-grid-side-info">
                    {this.createTimeElements()}
                </div>
                <div id="dragfillgrid-grid-div" onScroll={this.handleScroll}>
                    <table id="dragfillgrid-grid">
                        {this.createTable()}
                    </table>
                </div>
            </div>
        </div>
        );
    }
}

export default DragFillGrid;
