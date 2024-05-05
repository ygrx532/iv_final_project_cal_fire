import React from "react";
import styles from "../styles/final_project_styles.module.css";
import { geoPath, geoMercator } from "d3-geo";
import { scaleLinear, min, max } from "d3";


export function SymbolMap(props) {
    const {offsetX, offsetY, map, data, height, width,selectedUniqueId,setSelectedUniqueId, setTooltipX, setTooltipY, selectedCounty} = props;
    const projection = geoMercator().fitSize([width, height], map);
    const path = geoPath(projection);
    const radius = scaleLinear().range([4, 20])
    .domain([min(data, d => d.AcresBurned), max(data, d => d.AcresBurned)]);

    const handleMouseEnter = (d, event) => {
        setSelectedUniqueId(d.UniqueId);
        setTooltipX(event.pageX);
        setTooltipY(event.pageY);
    };

    const handleMouseOut = () => {
        setSelectedUniqueId(null);
        setTooltipX(null);
        setTooltipY(null);
    };
    
    const getColor = (selectedUniqueId, uniqueId) => {
        return selectedUniqueId&&uniqueId===selectedUniqueId ? "#f7bb43" : "red";
    }
    return <g transform={`translate(${offsetX}, ${offsetY})`}>
            {map.features.map((feature, idx) => {
                // Assume each feature has a property `name` that contains the county's name
                const className = feature.properties.name === selectedCounty ? `${styles.boundary} ${styles.highlighted}` : styles.boundary;

                return <path key={idx + "boundary"} className={className} d={path(feature)} />;
            })}
            {/* {map.features.map((feature, idx) => {
                return <path key={idx+"boundary"} className={styles.boundary} d={path(feature)} />
            })} */}
            {data.map(d => {
                const [x, y] =  projection([d.Longitude, d.Latitude]);
                //console.log(d.Longitude, x, d.Latitude, y);
                return <circle key={d.UniqueId} cx={x} cy={y} r={radius(d.AcresBurned)} opacity={0.7} stroke={'black'}
                fill={getColor(selectedUniqueId, d.UniqueId)} 
                onMouseEnter={(event)=> {
                   handleMouseEnter(d,event);
                }} 
                onMouseOut={()=> {
                   handleMouseOut();
                }} />
            })}
        </g>
    
}
export default SymbolMap;