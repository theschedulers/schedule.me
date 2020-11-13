import React, {Component} from 'react';
import './DragFillGrid.css';
class DragFillGrid extends Component {

    state = {
        rownum: this.props.rownum,
        colnum: this.props.colnum,
        rowheaders: this.props.rowheaders,
        colheaders: this.props.colheaders,
    }

    getRowCol = (e) => {
        var row = e.target.getAttribute("row");
        var col = e.target.getAttribute("column")
        console.log(row);
        console.log(col);
    }

    // Source: https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
    createTable = () => {
        
        let rows = this.props.rownum != null ? this.props.rownum : 5;
        let cols = this.props.colnum != null ? this.props.colnum : 5;


        let table = []
        for (let i = 0; i < rows; i++) {
            let children = []
            
            for (let j = 0; j < cols; j++) {  
                children.push(<td key={"rc" + i + "" + j} row={i} column={j} onClick={this.getRowCol}></td>)
            }
            table.push(<tr key={"r" + i}>{children}</tr>)
        }
        return table
    }

    createRowHeaders = () => {
        let headers = []
        let rows = this.props.rownum != null ? this.props.rownum : 5;
        for (let i = 0; i < rows; i++) {
            headers.push(<span className={"dragfillgrid-row-headers"} key={"dragfillgrid-row-headers" + i}>{this.state.rowheaders && this.state.rowheaders[i]}</span>);
        }
        return headers;
    }

    createColHeaders = () => {
        let headers = []
        let cols = this.props.colnum != null ? this.props.colnum : 5;

        headers.push(<span id="dragfill-grid-header-start" key={"dragfillgrid-col-headers" + 0}>{this.state.colheaders && this.state.colheaders[0]}</span>);
        for (let i = 1; i < cols-1; i++) {
            headers.push(<span key={"dragfillgrid-col-headers" + i}>{this.state.colheaders && this.state.colheaders[i]}</span>);
        }
        headers.push(<span id="dragfill-grid-header-end" key={"dragfillgrid-col-headers" + cols}>{this.state.colheaders && this.state.colheaders[cols-1]}</span>);

        return headers;
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
                {this.createColHeaders()}
            </div>
            <div id="dragfillgrid-grid-container">
                {/* Collection of cells: 24 * 7 cells */}
                <div id="dragfillgrid-grid-side-info">
                    {this.createRowHeaders()}
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
