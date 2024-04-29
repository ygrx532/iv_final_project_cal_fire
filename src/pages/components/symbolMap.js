import React from "react";
import styles from "../../styles/week12_styles.module.css";
import { geoPath, geoMercator } from "d3-geo";
import { scaleLinear, min, max } from "d3";


export function SymbolMap(props) {
    const {offsetX, offsetY, map, data, height, width,selectedUniqueId,setSelectedUniqueId} = props;
    const projection = geoMercator().fitSize([width, height], map);
    const path = geoPath(projection);
    const radius = scaleLinear().range([2, 20])
    .domain([min(data, d => d.AcresBurned), max(data, d => d.AcresBurned)]);
    
    const getColor = (selectedUniqueId, uniqueId) => {
        return selectedUniqueId&&uniqueId===selectedUniqueId ? "steelblue" : "red";
    }
    return <g transform={`translate(${offsetX}, ${offsetY})`}>
            {map.features.map((feature, idx) => {
                return <path key={idx+"boundary"} className={styles.boundary} d={path(feature)} />
            })}
            {data.map(d => {
                const [x, y] =  projection([d.Longitude, d.Latitude]);
                //console.log(d.Longitude, x, d.Latitude, y);
                return <circle key={d.UniqueId} cx={x} cy={y} r={radius(d.AcresBurned)} opacity={0.7} stroke={'black'}
                fill={getColor(selectedUniqueId, d.UniqueId)} 
                onMouseEnter={(event)=> {
                   setSelectedUniqueId(d.UniqueId);
                }} 
                onMouseOut={()=> {
                   setSelectedUniqueId(null);
                }} />
            })}
        </g>
    
}