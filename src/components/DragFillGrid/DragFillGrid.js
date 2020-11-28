import React, {Component} from 'react';
import ImageCell from '../ImageCell/ImageCell';
import './DragFillGrid.css';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

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
        confirmdrag: this.props.confirmdrag,
        confirmationModalToggle: false,
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
        if (JSON.stringify(nextProps.blockedcellsinput) !== JSON.stringify(prevState.blockedcellsinput)) {
            if (nextProps.blockedcellsinput != null) {
                var color = nextProps.blockedcellsinput[0].color;
                var darkColor = DragFillGrid.lightenDarkenColor(color, -60);
                var lightColor = DragFillGrid.lightenDarkenColor(color, 10);
                var cells = nextProps.blockedcellsinput[0].timeblocks.map((row) => (row.map((cell) => ({ ...cell , color: color, darkColor: darkColor, lightColor: lightColor, currentdrag: 0}))));
                return {blockedcells: cells, blockedcellsinput: nextProps.blockedcellsinput};
            }
            else {
                var color = "#B7DEFA";
                var darkColor = DragFillGrid.lightenDarkenColor(color, -60);
                var lightColor = DragFillGrid.lightenDarkenColor(color, 10);
                return {blockedcells: Array(24).fill().map(() => Array(7).fill().map(() => ({"blocked": 0, color: color, darkColor: darkColor, lightColor: lightColor, currentdrag: 0})))};
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
            var lightColor = DragFillGrid.lightenDarkenColor(color, 10);
            var cells = this.props.blockedcellsinput[0].timeblocks.map((row) => (row.map((cell) => ({ ...cell , color: color, darkColor: darkColor, lightColor: lightColor, currentdrag: 0}))));
            return cells;
        }
        else {
            var color = "#B7DEFA";
            var darkColor = DragFillGrid.lightenDarkenColor(color, -60);
            var lightColor = DragFillGrid.lightenDarkenColor(color, 10);
            return Array(24).fill().map(() => Array(7).fill().map(() => ({"blocked": 0, color: color, darkColor: darkColor, lightColor: lightColor, currentdrag: 0})));
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

    endDrag = (e) => {
        var blockedcells = this.state.blockedcells;
        var row = parseInt(e.target.getAttribute("row"));
        for (let i = 0; i < this.state.rownum; i++) {
            if (blockedcells[i][this.state.dragcol] != null)
                blockedcells[i][this.state.dragcol].currentdrag = 0;
        }

        if (this.state.confirmdrag == true && (parseInt(this.state.dragstartrow) <= parseInt(row)) && this.state.blockedcells[row][this.state.dragcol].blocked == 1) {
            this.toggleConfirmationModal();
            this.setState({ blockedcells: blockedcells,
                            dragging: 0,
                            dragendrow: row });
        }
        else {
            this.setState({ blockedcells: blockedcells,
                            dragcol: null,
                            dragging: 0,
                            dragstartrow: null,
                            dragendrow: null },
                            () => { this.state.timeBlocksUpdated(this.state.blockedcells.map((row) => (row.map((cell) => ({...cell}))))); });
            }
    }

    onConfirmDrag = () => {

        var count = document.getElementById("workers-count-required-input").value;
        var blockedcells = this.state.blockedcells;
        for (let i = this.state.dragstartrow; i <= this.state.dragendrow; i++) {
            if (blockedcells[i][this.state.dragcol] != null)
                blockedcells[i][this.state.dragcol].workerscountrequired = parseInt(count);
        }

        this.setState({ blockedcells: blockedcells,
                        dragcol: null,
                        dragging: 0,
                        dragstartrow: null,
                        dragendrow: null },
                        () => { this.state.timeBlocksUpdated(this.state.blockedcells.map((row) => (row.map((cell) => ({...cell}))))); });
    }

    onCancelDrag = () => {
        var blockedcells = this.state.blockedcells;
        for (let i = this.state.dragstartrow; i <= this.state.dragendrow; i++) {
            if (blockedcells[i][this.state.dragcol] != null)
                blockedcells[i][this.state.dragcol].blocked = 0;
        }

        this.setState({ blockedcells: blockedcells,
                        dragcol: null,
                        dragging: 0,
                        dragstartrow: null,
                        dragendrow: null },
                        () => { this.state.timeBlocksUpdated(this.state.blockedcells.map((row) => (row.map((cell) => ({...cell}))))); });

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
                    borderLeft: this.state.blockedcells[i][j] && (this.state.blockedcells[i][j].blocked == 1 ? "solid " + this.state.blockedcells[i][j].darkColor + " 1px" : ""),
                    display: "flex",
                    alignItems: "center",
                }

                var cellleftborderstyle = {
                    width: "4px",
                    height: "calc(100% + 1px)",
                    backgroundColor: this.state.blockedcells[i][j] && (this.state.blockedcells[i][j].blocked == 1 ? this.state.blockedcells[i][j].darkColor : "")
                }

                var imagecell = (this.state.draggable == false && this.state.blockedcells[i][j].members) ? (<ImageCell
                    members={this.state.blockedcells[i][j].members && this.state.blockedcells[i][j].blocked == 1 && this.state.blockedcells[i][j].members.map((member) => {
                        return member
                    })}
                    imagebordercolor={this.state.blockedcells[i][j].members && this.state.blockedcells[i][j].darkColor}
                    >
                        
                    </ImageCell>) : "";
                
                children.push(<td key={"rc" + i + "" + j} row={i} column={j} draggable="false"
                                style={cellstyle}
                                onMouseDown={(e) => {if (this.props.draggable == true) { this.startDrag(e); this.drag(e)}} }
                                onMouseEnter={(e) => { if (this.state.dragging == 1 && this.props.draggable == true) this.drag(e) }}
                                onMouseUp={(e) => { if (this.props.draggable == true) this.endDrag(e)}}>
                                    <div row={i} column={j} style={{display: "flex", flex: 1, alignItems: "center", backgroundColor: "none", height: "100%", width: "100%", borderBottom: "solid #d3d3d3 1px"}}>
                                        <div row={i} column={j} style={cellleftborderstyle}></div>
                                        {/* <div style={{...cellleftborderstyle, backgroundColor: this.state.blockedcells[i][j] && (this.state.blockedcells[i][j].blocked == 1 ? "#B7FABA" : "")}}></div> */}
                                        {imagecell}
                                    </div>
                                </td>)
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

    toggleConfirmationModal = () => {
        this.setState({ confirmationModalToggle: !this.state.confirmationModalToggle });
    }
    
    render() {
        return (
        <div id="DragFillGrid">
            <ConfirmationModal
                toggle={this.state.confirmationModalToggle}
                setToggle={this.toggleConfirmationModal}
                onConfirm={this.onConfirmDrag}
                onCancel={this.onCancelDrag}
                header={"How many workers do you need for this shift?"}
                subheader={<input type="number" id={"workers-count-required-input"} placeholder={"Please input an integer"} style={{padding: "0.25em 1em 0.25em 1em", borderColor: "#E5C09C", borderRadius: "0.5em", textAlign: "center"}}/>}
                confirmbuttontext={"Confirm"}
                cancelbuttontext={"Cancel"}
                // backdrop={"static"}
            />
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
