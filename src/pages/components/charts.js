import React from "react";
import { scaleLinear, scaleBand, area, max, min, curveBasis } from "d3";
import * as d3 from "d3";
import { NormalizeData } from "./utils";

function Points({ data, xScale, yScale, selectedAttr, setSelectedAttr, selectedYear, setSelectedYear}) {

    const[selectedPoint, setSelectedPoint] = React.useState(null)

    const getPointOpacity = (selectedAttr, attr) => {
        if (!selectedAttr) {
            return "1";
        }
        else {
            return selectedAttr&&attr==selectedAttr ? "1" : "0.2";
        }
    };

    const getRadius = (selectedPoint, point) =>{
        return selectedPoint&&point==selectedPoint ? "8" : "5";
    };

    if (data){

    return (
        <g>
            {data.map((d, i) => (
                <circle
                    key={i}
                    cx={xScale(d.year)}
                    cy={yScale(d.totalAcresBurned)}
                    r={getRadius(selectedPoint,xScale(d.year)+'Total Acres Burned')}
                    fill="#FF7F50"
                    opacity={getPointOpacity(selectedAttr,'Total Acres Burned')}
                    onMouseEnter={(event) =>{ 
                        setSelectedAttr('Total Acres Burned');
                        setSelectedPoint(xScale(d.year)+'Total Acres Burned');
                        }}
                    onMouseOut={()=> {
                        setSelectedAttr(null)
                        setSelectedPoint(null);
                    }}
                    onClick={()=> setSelectedYear(d.year)}
                    
                />          
            ))}
            {data.map((d, i) => (
                <circle
                    key={i}
                    cx={xScale(d.year)}
                    cy={yScale(d.totalPersonnelInvolved)}
                    r={getRadius(selectedPoint,xScale(d.year)+'Total Personnel Involved')}
                    fill="#0033CC"
                    opacity={getPointOpacity(selectedAttr,'Total Personnel Involved')}
                    onMouseEnter={(event) =>{ 
                        setSelectedAttr('Total Personnel Involved');
                        setSelectedPoint(xScale(d.year)+'Total Personnel Involved');
                        }}
                    onMouseOut={()=> {
                        setSelectedAttr(null)
                        setSelectedPoint(null);
                    }}
                    onClick={()=> setSelectedYear(d.year)}
                />          
            ))}
            {data.map((d, i) => (
                <circle
                    key={i}
                    cx={xScale(d.year)}
                    cy={yScale(d.totalCrewsInvolved)}
                    r={getRadius(selectedPoint,xScale(d.year)+'Total Crews Involved')}
                    fill="#FF6B6B"
                    opacity={getPointOpacity(selectedAttr,'Total Crews Involved')}
                    onMouseEnter={(event) =>{ 
                        setSelectedAttr('Total Crews Involved');
                        setSelectedPoint(xScale(d.year)+'Total Crews Involved');
                        }}
                    onMouseOut={()=> {
                        setSelectedAttr(null)
                        setSelectedPoint(null);
                    }}
                    onClick={()=> setSelectedYear(d.year)}
                />          
            ))}
            {data.map((d, i) => (
                <circle
                    key={i}
                    cx={xScale(d.year)}
                    cy={yScale(d.totalInjuries)}
                    r={getRadius(selectedPoint,xScale(d.year)+'Total Injuries')}
                    fill="#404040"
                    opacity={getPointOpacity(selectedAttr,'Total Injuries')}
                    onMouseEnter={(event) =>{ 
                        setSelectedAttr('Total Injuries');
                        setSelectedPoint(xScale(d.year)+'Total Injuries');
                        }}
                    onMouseOut={()=> {
                        setSelectedAttr(null)
                        setSelectedPoint(null);
                    }}
                    onClick={()=> setSelectedYear(d.year)}
                />          
            ))}
            {data.map((d, i) => (
                <circle
                    key={i}
                    cx={xScale(d.year)}
                    cy={yScale(d.totalStructuresDestroyed)}
                    r={getRadius(selectedPoint,xScale(d.year)+'Total Structures Destroyed')}
                    fill="#6699CC"
                    opacity={getPointOpacity(selectedAttr,'Total Structures Destroyed')}
                    onMouseEnter={(event) =>{ 
                        setSelectedAttr('Total Structures Destroyed');
                        setSelectedPoint(xScale(d.year)+'Total Structures Destroyed');
                        }}
                    onMouseOut={()=> {
                        setSelectedAttr(null)
                        setSelectedPoint(null);
                    }}
                    onClick={()=> setSelectedYear(d.year)}
                />          
            ))}
        </g>

        );
    }else{
        return <g></g>
    }
}


function MultipleLineChart(props){
    const {offsetX, offsetY, width, height, data, selectedYear, setSelectedYear} = props;
        
        const[selectedAttr, setSelectedAttr] = React.useState(null);
        const normalizedData = NormalizeData(data);
        //console.log("multiple line:", normalizedData) 


        const xScale = d3.scaleBand().range([0, width]).domain(normalizedData.map(d => d.year));
        const yScale = d3.scaleLinear().range([height, 0]).domain([0, 1]).nice();
        const line1 = d3.line().x(d => xScale(d.year)).y(d => yScale(d.totalAcresBurned));
        const line2 = d3.line().x(d => xScale(d.year)).y(d => yScale(d.totalPersonnelInvolved));
        const line3 = d3.line().x(d => xScale(d.year)).y(d => yScale(d.totalCrewsInvolved));
        const line4 = d3.line().x(d => xScale(d.year)).y(d => yScale(d.totalInjuries));
        const line5 = d3.line().x(d => xScale(d.year)).y(d => yScale(d.totalStructuresDestroyed));
        const xTicks = xScale.domain();
        const [yAxisScale, setyAxisScale] = React.useState(() => d3.scaleLinear().range([height, 0]).domain([0, 1]).nice());

        const getLineOpacity = (selectedAttr, attr) => {
            if (!selectedAttr) {
                return "1";
            }
            else {
                return selectedAttr&&attr==selectedAttr ? "1" : "0.2";
            }
        };

        const getyAxisScale = (selectedAttr) => {
            switch (selectedAttr) {
                case "Total Acres Burned":
                    const min1 = d3.min(data, d => d.totalAcresBurned);
                    const max1 = d3.max(data, d => d.totalAcresBurned);
                    const yScale1 = d3.scaleLinear().range([height, 0])
                    .domain([min1, max1]).nice();
                    return yScale1
                case "Total Personnel Involved":
                    const min2 = d3.min(data, d => d.totalPersonnelInvolved);
                    const max2 = d3.max(data, d => d.totalPersonnelInvolved)
                    const yScale2 = d3.scaleLinear().range([height, 0])
                    .domain([min2, max2]).nice();
                    return yScale2;
                case "Total Crews Involved":
                    const min3 = d3.min(data, d => d.totalCrewsInvolved);
                    const max3 = d3.max(data, d => d.totalCrewsInvolved)
                    const yScale3 = d3.scaleLinear().range([height, 0])
                    .domain([min3,max3]).nice();
                    return yScale3;
                case "Total Injuries":
                    const min4 = d3.min(data, d => d.totalInjuries);
                    const max4 = d3.max(data, d => d.totalInjuries)
                    const yScale4 = d3.scaleLinear().range([height, 0])
                    .domain([min4, max4]).nice();
                    return yScale4;
                case "Total Structures Destroyed":
                    const min5 = d3.min(data, d => d.totalStructuresDestroyed);
                    const max5 = d3.max(data, d => d.totalStructuresDestroyed)
                    const yScale5 = d3.scaleLinear().range([height, 0])
                    .domain([min5, max5]).nice();
                    return yScale5;
                default:
                    return yScale;
            }
        }

        
        return <g transform={`translate(${offsetX},${offsetY})`}>
            <line y2={height} stroke={`black`} />
            {yAxisScale.ticks().map( tickValue => {
                return <g key={tickValue} transform={`translate(-10, ${yAxisScale(tickValue)})`}>
                        <text style={{ textAnchor:'end', fontSize:'12px' }}>
                        {tickValue}
                        </text>
                    </g> 
            })}
            <text style={{ textAnchor:'start', fontSize:'12px'}} transform={`translate(10, 0)rotate(0)`}>
                    {selectedAttr}
                </text>
            <line x1={0} y1={height} x2={width} y2={height} stroke={`black`} />
            {xTicks.map( tickValue => {
                return <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height})`}>
                        <line y2={5} stroke={"black"} />
                        <text style={{ textAnchor:'middle', fontSize:'12px'}} y={20}>
                        {tickValue}
                        </text>
                </g> 
            })}
            <text style={{ textAnchor:'end', fontSize:'12px'}} transform={`translate(${width}, ${height-10})`}>
                            {"Year"}
                </text>
            <path d={line1(normalizedData)} stroke={"#FF7F50"} strokeWidth={3} fill={"none"} 
                opacity = {getLineOpacity(selectedAttr,'Total Acres Burned')}
                onMouseEnter={(event)=> {
                    setSelectedAttr('Total Acres Burned');
                    setyAxisScale(()=>getyAxisScale('Total Acres Burned'));
                }} 
                onMouseOut={()=> {
                    setSelectedAttr(null);
                    setyAxisScale(()=>getyAxisScale(null));
                }}/>
            <path d={line2(normalizedData)} stroke={"#0033CC"} strokeWidth={3} fill={"none"}
                opacity = {getLineOpacity(selectedAttr,'Total Personnel Involved')}
                onMouseEnter={(event)=> {
                    setSelectedAttr('Total Personnel Involved')
                    setyAxisScale(()=>getyAxisScale('Total Personnel Involved'));
                }} 
                onMouseOut={()=> {
                    setSelectedAttr(null);
                    setyAxisScale(()=>getyAxisScale(null));
                }} />
            <path d={line3(normalizedData)} stroke={"#FF6B6B"} strokeWidth={3} fill={"none"}
                opacity = {getLineOpacity(selectedAttr,'Total Crews Involved')}
                onMouseEnter={(event)=> {
                    setSelectedAttr('Total Crews Involved')
                    setyAxisScale(()=>getyAxisScale('Total Crews Involved'));
                }} 
                onMouseOut={()=> {
                    setSelectedAttr(null);
                    setyAxisScale(()=>getyAxisScale(null));
                }} />
            <path d={line4(normalizedData)} stroke={"#404040"} strokeWidth={3} fill={"none"}
                opacity = {getLineOpacity(selectedAttr,'Total Injuries')}
                onMouseEnter={(event)=> {
                    setSelectedAttr('Total Injuries')
                    setyAxisScale(()=>getyAxisScale('Total Injuries'));
                }} 
                onMouseOut={()=> {
                    setSelectedAttr(null);
                    setyAxisScale(()=>getyAxisScale(null));
                }} />
            <path d={line5(normalizedData)} stroke={"#6699CC"} strokeWidth={3} fill={"none"}
                opacity = {getLineOpacity(selectedAttr,'Total Structures Destroyed')}
                onMouseEnter={(event)=> {
                    setSelectedAttr('Total Structures Destroyed')
                    setyAxisScale(()=>getyAxisScale('Total Structures Destroyed'));
                }} 
                onMouseOut={()=> {
                    setSelectedAttr(null);
                    setyAxisScale(()=>getyAxisScale(null));
                }} />

            <Points data={normalizedData} xScale={xScale} yScale={yScale}
             selectedAttr={selectedAttr} setSelectedAttr={setSelectedAttr} 
             selectedYear={selectedYear} setSelectedYear={setSelectedYear}></Points>

            {/* <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(week1.slice(-1)[0].date.slice(0, 3))}, ${yScale(week1.slice(-1)[0].value)})`}>
                            {"Week 1"}
                </text>
            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(week2.slice(-1)[0].date.slice(0, 3))}, ${yScale(week2.slice(-1)[0].value)})`}>
                            {"Week 2"}
                </text>
            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(week3.slice(-1)[0].date.slice(0, 3))+60}, ${yScale(week3.slice(-1)[0].value)+10})`}>
                            {"Week 3"}
            </text>
            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(week4.slice(-1)[0].date.slice(0, 3))+60}, ${yScale(week4.slice(-1)[0].value)+10})`}>
                            {"Week 4"}
            </text>
            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(week5.slice(-1)[0].date.slice(0, 3))+60}, ${yScale(week5.slice(-1)[0].value)+10})`}>
                            {"Week 5"}
            </text> */}

            </g>

}

function BarChart(props) {
    const { offsetX, offsetY, data, height, width, selectedStation, setSelectedStation } = props;
        const xScale = scaleBand().range([0, width])
            .domain(data.map(d => d.station))
        const yScale = scaleLinear().range([height, 0])
            .domain([0, max(data, d => d.start > d.end? d.start:d.end)])
            .nice();
        const getColor = (selectedStation, station) => {
                return selectedStation&&station===selectedStation ? "red" : "#99d594";
            };

    
    return <g transform={`translate(${offsetX}, ${offsetY})`} >
        {/* the text needed is given as the following */}
        <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(${width/3}, 0)`}>
                {"Num. of ridders start from a station"}
        </text>
        {/* start your code here */}
        {<line y2={height} stroke='black'/>}
            {yScale.ticks(5).map(tickValue => 
                <g key={tickValue+"up"} transform={`translate(-10, ${yScale(tickValue)})`}>
                    <line x2={10} stroke='black' />
                    <text style={{ textAnchor:'end', fontSize:'10px' }} >
                        {tickValue}
                    </text>
                </g>
            )}
            {data.map( d =>
                <rect key={d.station+"barUp"} x={xScale(d.station)} y={yScale(d.start)}
                width={xScale.bandwidth()} height={height-yScale(d.start)} stroke="black" 
                fill={getColor(selectedStation, d.station)} 
                onMouseEnter={() => setSelectedStation(d.station)} 
                onMouseOut={()=> setSelectedStation(null)} />  
            )}
    </g>
}


