import React, {Component} from 'react';
import './ImageCell.css';
import { Tooltip } from '@material-ui/core'
class ImageCell extends Component {

    getTooltipPopup = () => {

        var containerStyle = {
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            padding: "1em",
        }

        var memberContainerStyle = {
            display: "flex",
            margin: "1em",
        }

        var imageContainerStyle = {

        }

        var imageStyle = {
            width: "4em",
            height: "4em",
            marginRight: "1em",
            borderRadius: "100%",
            pointerEvents: "none",
            objectFit: "cover",
        }

        var textContainerStyle = {

        }

        var textStyle = {
            margin: "0em",
            color: "#d7d7d7",
        }

        var subtextStyle = {
            margin: "0em",
            color: "#d7d7d7",
            fontSize: "small",
        }

        return (<div style={containerStyle}>
            <h6 style={{textAlign: "center"}}>Members</h6>
            {this.props.members && this.props.members.map((member) => (
                <div style={memberContainerStyle}>
                    <section style={imageContainerStyle}>
                        <img style={imageStyle} src={member.photo}/>
                    </section>
                    <div style={textContainerStyle}>
                        <h5 style={textStyle}>{member.text}</h5>
                        <p style={subtextStyle}>{member.subtext}</p>
                    </div>
                </div>
            ))}
        </div>)
    }

    render() {
        return (
            <Tooltip title={this.getTooltipPopup()} placement="right" open={this.props.open}>
                <div id="ImageCell">
                    {this.props.members && this.props.members.map((member) => (
                        <section className="image-container">
                            <img className="image" src={member.photo}/>
                        </section>
                    ))}
                </div>
            </Tooltip>
        );
    }
}

export default ImageCell;
