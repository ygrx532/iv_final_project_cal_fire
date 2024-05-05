import React from "react";
import { csv, json, select } from "d3";
import styles from "../styles/final_project_styles.module.css";
import { SymbolMap } from "../components/symbolMap";
import { AggregateDataByYear, AggregateDataByCounty, HandlerPosition, NormalizeData } from "../components/utils";
import { MultipleLineChart, BarChart} from "../components/charts";
import { Tooltip } from "../components/tooltip";



const csvUrl = 'https://gist.githubusercontent.com/james-shan/fb6d4b947413a11d0c7f3d9edb4014c3/raw/8b1559c0546799acb14eb647717af95207844bec/California_Fire_Incidents.csv';
const mapUrl = 'https://gist.githubusercontent.com/james-shan/726a2517d8b14e20ce28f0eb3bdab01c/raw/bc0ed711f1f7fcb17c6e9260ba8e6166ac2481c1/california_geomap.json';


function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.AcresBurned = +d.AcresBurned;
                d.ArchiveYear = +d.ArchiveYear;
                d.Name = d.Name;
                d.Counties = d.Counties;
                d.Latitude = +d.Latitude;
                d.Longitude = +d.Longitude;
                d.MajorIncident = d.MajorIncident;
                d.UniqueId = d.UniqueId;
                d.PersonnelInvolved = +d.PersonnelInvolved;
                d.Injuries = +d.Injuries;
                d.CrewsInvolved = +d.CrewsInvolved;
                d.StructuresDestroyed = +d.StructuresDestroyed;
                d.Engines = +d.Engines;
                //more to be added

            });
            setData(data);
        });
    }, [csvPath]);
    return dataAll;
}

function useMap(jsonPath) {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        json(jsonPath).then(geoJsonData => {
            setData(geoJsonData);
        })
    }, [jsonPath]);
    return data;
}

function CalFire(){
    const [year, setYear] = React.useState('2013');
    const [selectedUniqueId,setSelectedUniqueId] = React.useState(null);
    const [selectedCounty, setSelectedCounty] = React.useState(null);
    const [tooltipX, setTooltipX]=React.useState(null);
    const [tooltipY, setTooltipY]=React.useState(null);

    const WIDTH = 1500;
    const HEIGHT = 1000;
    const margin = { top: 20, right: 80, bottom: 160, left: 80, gap:200 };
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.bottom;

    const dataAll = useData(csvUrl);
    const map = useMap(mapUrl);
    
    if (!map || !dataAll) {
            return <pre>Loading...</pre>;
        };

    //console.log(map, dataAll);
    const changeHandler = (event) => {
        setYear(event.target.value);
    }

    //Filter out redundant data when a fire was reported by multiple counties
    const seen = new Set();
    const data = dataAll.filter(item => {
        if (!seen.has(item.UniqueId)) {
            seen.add(item.UniqueId);
            return true;
        }
        return false;
    });

    // filter out data according to year
    const yearData = data.filter( d => {
        return d.ArchiveYear == year ;
    });

    const mapData = yearData.filter( d =>{
        return d.MajorIncident == 'TRUE' && d.Latitude !== 0;
    })

    // Aggregate data by year for time series plot
    const aggregatedYearData = AggregateDataByYear(data);

    // Aggregate data by county for bar chart
    const aggregateCountyData = AggregateDataByCounty(yearData);

    const selectedFire = dataAll.filter(d => d.UniqueId===selectedUniqueId)[0];
    
    return (<div className={styles.body}>
        <header className={styles.pageheader}>
            <h1 style={{color: "White", padding: "10px", fontSize:"32px"}}>California Wildfire 2013-2019</h1>
            <h3 style ={{paddingLeft: "12px", fontSize:"16px", padding:"5px"}}> A visualization of the wildfire incidents in california from 2013-2019.</h3>
        </header>
        
            <svg width={WIDTH} height={HEIGHT}>
                <g>
                <SymbolMap offsetX={margin.left} offsetY={margin.top} height={innerHeight} width={(innerWidth-margin.gap)/2} 
                data={mapData} map={map}
                selectedUniqueId={selectedUniqueId} setSelectedUniqueId={setSelectedUniqueId}
                setTooltipX={setTooltipX} setTooltipY={setTooltipY}
                selectedCounty={selectedCounty}/>

                <MultipleLineChart offsetX={margin.left+innerWidth/2} offsetY={margin.top+50} data={aggregatedYearData} height={(innerHeight-margin.gap)/2} 
                width={(innerWidth-margin.gap)/2} selectedYear={year} setSelectedYear={setYear}/>

                <BarChart offsetX={margin.left+innerWidth/2} offsetY={margin.top + innerHeight/2+50} data = {aggregateCountyData} 
                height={(innerHeight-margin.gap)/2} width={(innerWidth-margin.gap)/2} year = {year} selectedCounty = {selectedCounty} setSelectedCounty = {setSelectedCounty}/>

                </g>
                
            </svg>
        
        <div><Tooltip d={selectedFire} x={tooltipX} y={tooltipY}></Tooltip></div>
            
        <div className={styles.slidercontainer}>
            <input key="slide" type='range' min='2013' max='2019' value={year} step='1' onChange={changeHandler} className={styles.slider}/>
            <div style={{ position: 'absolute', left: `calc(${HandlerPosition(year)}%)`, bottom: '-20px' }}>
                {year}
            </div>
        </div>
        
    </div>)
}

export default CalFire