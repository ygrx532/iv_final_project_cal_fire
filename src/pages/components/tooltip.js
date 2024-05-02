import React from "react";

function Tooltip(props) {
    const {d, x, y} = props;
    //console.log(d);
    if (x === null|!d) {
        return <div></div>;
    } else {
        //console.log(d);
        const divStyle = {
            position: "absolute",
            textAlign: "left",
            padding: "5px",
            paddingLeft:"20px",
            font: "12px sans-serif",
            background: "lightgrey",
            border: "0px",
            borderRadius: "8px",
            opacity: "0.7",
            pointerEvents: "none",
            left: `${x+15}px`,
            top: `${y}px`
        };
        return (<div style={divStyle} >
            <p>{d.Name}</p>
            <ul> 
            <li>Starting County: {d.Counties}</li>
            <li>Acres Burned: {d.AcresBurned}</li>
            <li>Personnel Involved: {d.PersonnelInvolved}</li>
            <li>Injuries: {d.Injuries}</li>
            <li>Structures Destroyed: {d.StructuresDestroyed}</li>
            <li>Crews Involved: {d.CrewsInvolved}</li>
            <li>Engines: {d.Engines}</li>
            </ul>
            </div>);
    };  
}

export {Tooltip};