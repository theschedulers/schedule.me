import React, {Component} from 'react';
import './DragFillGrid.css';
class DragFillGrid extends Component {

    state = {
        id: this.props.id,
        rownum: this.props.rownum,
        colnum: this.props.colnum,
        rowheaders: this.props.rowheaders,
        colheaders: this.props.colheaders,
        draggable: this.props.draggable,
        timeBlocksUpdated: this.props.timeBlocksUpdated,
        blockedcells: this.getBlockedCells(),
        blockedcellsinput: this.props.blockedcellsinput,
        dragging: 0,
        dragcol: null,
        dragstartrow: null,
        dragendrow: null,
        dragmaxendrow: null,
    }

    /* Important props
        blockedcellsinput
    */

    // https://css-tricks.com/snippets/javascript/lighten-darken-color/
    static lightenDarkenColor(col, amt) {
        var usePound = false;
      
        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }
     
        var num = parseInt(col,16);
        var r = (num >> 16) + amt;
     
        if (r > 255) r = 255;
        else if  (r < 0) r = 0;
     
        var b = ((num >> 8) & 0x00FF) + amt;
     
        if (b > 255) b = 255;
        else if  (b < 0) b = 0;
     
        var g = (num & 0x0000FF) + amt;
     
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
     
        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.blockedcellsinput !== prevState.blockedcellsinput) {
            if (nextProps.blockedcellsinput != null) {
                var color = nextProps.blockedcellsinput[0].color;
                var darkColor = DragFillGrid.lightenDarkenColor(color, -60);
                var cells = nextProps.blockedcellsinput[0].timeblocks.map((row) => (row.map((cell) => ({ "blocked": cell.blocked , color: color, darkColor: darkColor, currentdrag: 0}))));
                return {blockedcells: cells};
            }
            else {
                var color = "#B7DEFA";
                var darkColor = DragFillGrid.lightenDarkenColor(color, -60);
                return {blockedcells: Array(24).fill().map(() => Array(7).fill().map(() => ({"blocked": 0, color: color, darkColor: darkColor, currentdrag: 0})))};
            }
        }
        return null;
    }

    getBlockedCells() {
        /* TODO: Allow multiple layers
            for not this.props.blockedcellsinput[0] is used because there's only one layer (and this is what's supported atm)
        */
        if (this.props.blockedcellsinput != null) {
            var color = this.props.blockedcellsinput[0].color;
            var darkColor = DragFillGrid.lightenDarkenColor(color, -60);
            var cells = this.props.blockedcellsinput[0].timeblocks.map((row) => (row.map((cell) => ({ "blocked": cell.blocked , color: color, darkColor, currentdrag: 0}))));
            return cells;
        }
        else {
            var color = "#B7DEFA";
            var darkColor = DragFillGrid.lightenDarkenColor(color, -60);
            return Array(24).fill().map(() => Array(7).fill().map(() => ({"blocked": 0, color: color, darkColor: darkColor, currentdrag: 0})));
        }
    }

    blockCells = (col, startrow, endrow) => {
        if (this.state.dragcol != null && this.state.dragcol == col) {
            var blockedcells = this.state.blockedcells;
            for (let i = startrow; i <= endrow; i++) {
                blockedcells[i][col].blocked = 1;
                blockedcells[i][col].currentdrag = 1;
            }
            this.setState({ blockedcells: blockedcells,
                            dragendrow: endrow,
                            dragmaxendrow: (this.state.dragmaxendrow > endrow) ? this.state.dragmaxendrow : endrow },
                            () => {
                                var blockedcells = this.state.blockedcells;
                                for (let i = endrow + 1; i <= this.state.dragmaxendrow; i++) {
                                    blockedcells[i][col].blocked = 0;
                                }
                                this.setState({ blockedcells: blockedcells })
                            });
        }
    }

    startDrag = (e) => {
        var row = parseInt(e.target.getAttribute("row"));
        var col = parseInt(e.target.getAttribute("column"));
        var blockedcells = this.state.blockedcells;
        blockedcells[row][col].blocked = blockedcells[row][col].blocked == 1 ? 0 : 1;
        this.setState({ blockedcells: blockedcells,
                        dragging: 1,
                        dragcol: col,
                        dragstartrow: row,
                        dragmaxendrow: row });
    }

    drag = (e) => {
        var row = parseInt(e.target.getAttribute("row"));
        var col = parseInt(e.target.getAttribute("column"));

        if (this.state.dragging == 1) {
            this.blockCells(col, this.state.dragstartrow, row);
        }
    }

    endDrag = () => {
        var blockedcells = this.state.blockedcells;
        for (let i = 0; i < this.state.rownum; i++) {
            if (blockedcells[i][this.state.dragcol] != null)
                blockedcells[i][this.state.dragcol].currentdrag = 0;
        }
        this.setState({ blockedcells: blockedcells,
                        dragcol: null,
                        dragging: 0,
                        dragstartrow: null,
                        dragendrow: null },
                        () => { this.state.timeBlocksUpdated(this.state.blockedcells.map((row) => (row.map((cell) => ({ "blocked": cell.blocked }))))); });
    }

    // Source: https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
    createTable = () => {

        let rows = this.props.rownum != null ? this.props.rownum : 5;
        let cols = this.props.colnum != null ? this.props.colnum : 5;


        let table = []
        for (let i = 0; i < rows; i++) {
            let children = []
            
            for (let j = 0; j < cols; j++) {
                var cellstyle = {
                    backgroundColor: this.state.blockedcells[i][j] && (this.state.blockedcells[i][j].blocked == 1 ? this.state.blockedcells[i][j].color : ""),
                    borderLeft: this.state.blockedcells[i][j] && (this.state.blockedcells[i][j].blocked == 1 ? "solid " + this.state.blockedcells[i][j].darkColor + " 2px" : "")
                }
                
                children.push(<td key={"rc" + i + "" + j} row={i} column={j} draggable="false"
                                style={cellstyle}
                                onMouseDown={(e) => {if (this.props.draggable == true) { this.startDrag(e); this.drag(e)}} }
                                onMouseEnter={(e) => { if (this.state.dragging == 1 && this.props.draggable == true) this.drag(e) }}
                                onMouseUp={(e) => { if (this.props.draggable == true) this.endDrag()}}></td>)
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
        var string = "";
        if (e.target.getAttribute('id') == "dragfillgrid-grid-div")
            document.getElementById(string.concat("dragfillgrid-grid-side-info-", this.state.id)).scrollTop = e.target.scrollTop;
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
                <div id={"dragfillgrid-grid-side-info-" + this.state.id + ""} className="dragfillgrid-grid-side-info">
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
