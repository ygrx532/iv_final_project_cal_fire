import React from "react";
import { csv, json } from "d3";
import styles from "../styles/week12_styles.module.css";
import { SymbolMap } from "./components/symbolMap";
import { AggregateDataByYear, NormalizeData } from "./components/utils";
import { MultipleLineChart} from "./components/charts";
import { Tooltip } from "./components/tooltip";



const csvUrl = 'https://gist.githubusercontent.com/james-shan/fb6d4b947413a11d0c7f3d9edb4014c3/raw/8b1559c0546799acb14eb647717af95207844bec/California_Fire_Incidents.csv';
const mapUrl = 'https://gist.githubusercontent.com/james-shan/726a2517d8b14e20ce28f0eb3bdab01c/raw/bc0ed711f1f7fcb17c6e9260ba8e6166ac2481c1/california_geomap.json';


function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.AcresBurned = +d.AcresBurned;
                d.ArchiveYear = +d.ArchiveYear;
                d.Counties = d.Counties;
                d.Latitude = +d.Latitude;
                d.Longitude = +d.Longitude;
                d.MajorIncident = d.MajorIncident;
                d.UniqueId = d.UniqueId;
                d.PersonnelInvolved = +d.PersonnelInvolved;
                d.Injuries = +d.Injuries;
                d.CrewsInvolved = +d.CrewsInvolved;
                d.StructuresDestroyed = +d.StructuresDestroyed;
                //more to be added

            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function useMap(jsonPath) {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        json(jsonPath).then(geoJsonData => {
            setData(geoJsonData);
        })
    }, []);
    return data;
}

function CalFire(){
    const [year, setYear] = React.useState('0');
    const [selectedUniqueId,setSelectedUniqueId] = React.useState(null);

    const WIDTH = 1600;
    const HEIGHT = 1000;
    const margin = { top: 20, right: 80, bottom: 160, left: 80, gap:80 };
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.bottom;

    const dataAll = useData(csvUrl);
    const map = useMap(mapUrl);
    const YEAR = ['2013', '2014', '2015', '2016', '2017', '2018', '2019'];
    
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
        return d.ArchiveYear == YEAR[year] ;
    });

    const mapData = yearData.filter( d =>{
        return d.MajorIncident == 'TRUE' && d.Latitude !== 0;
    })

    // Aggregate data by year
    const aggregatedData = AggregateDataByYear(data);
    
    const selectedPoint = dataAll.filter(d => d.station===selectedUniqueId)[0];
     // Note: stationYearData is the data of the year of a seleted station. 
     const stationYearData = dataAll.filter( d=> {
        return d.UniqueId ==selectedUniqueId;
    }); 
    
    return (<div className={styles.body}>
        <div className={styles.slidecontainer}>
            <input key="slide" type='range' min='0' max='6' value={year} step='1' onChange={changeHandler} class={styles.slider}/>
            <input key="yearText" type="text" value={YEAR[year]} readOnly/>
        </div>
            <svg width={WIDTH} height={HEIGHT}>
                <g>
                <SymbolMap offsetX={margin.left} offsetY={margin.top} height={innerHeight} 
                width={(innerWidth-margin.gap)/2} data={mapData} map={map}selectedUniqueId={selectedUniqueId} 
               setSelectedUniqueId={setSelectedUniqueId}/>
                {<MultipleLineChart offsetX={margin.left+innerWidth/2+100} offsetY={margin.top} data={aggregatedData} height={(innerHeight-margin.gap)/2} 
                width={(innerWidth-margin.gap)/2} selectedYear={year} setSelectedYear={setYear}/>}
                </g>
                {/* <Tooltip d={selectedPoint} stationYearData={stationYearData} left={margin.left+innerWidth/2} 
                top={margin.top+40+innerHeight/2} height={(innerHeight-margin.gap)/2} width={(innerWidth-margin.gap)/2}/> */}
            </svg>
        {/* <div style={{position: "absolute", textAlign: "left", width: "240px",left:"40px", top:"40px"}}>
            <h3>Citi bike 2020</h3>
            <p>A visualization of the numbers of citi bike riders over 2020.</p>
        </div> */}
        
    </div>)
}

export default CalFire