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
                    fill="#FF281B"
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
                    fill="#FDB750"
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
                    fill="#B8390E"
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
                    fill="#3B0918"
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
        const yLabel = (!selectedAttr)? "Standardized attributes of the wildfires": selectedAttr;

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
                    .domain([min1-0.125*(max1-min1), max1+0.125*(max1-min1)]);
                    return yScale1
                case "Total Personnel Involved":
                    const min2 = d3.min(data, d => d.totalPersonnelInvolved);
                    const max2 = d3.max(data, d => d.totalPersonnelInvolved)
                    const yScale2 = d3.scaleLinear().range([height, 0])
                    .domain([min2-0.125*(max2-min2), max2+0.125*(max2-min2)]);
                    return yScale2;
                case "Total Crews Involved":
                    const min3 = d3.min(data, d => d.totalCrewsInvolved);
                    const max3 = d3.max(data, d => d.totalCrewsInvolved)
                    const yScale3 = d3.scaleLinear().range([height, 0])
                    .domain([min3-0.125*(max3-min3), max3+0.125*(max3-min3)]);
                    return yScale3;
                case "Total Injuries":
                    const min4 = d3.min(data, d => d.totalInjuries);
                    const max4 = d3.max(data, d => d.totalInjuries)
                    const yScale4 = d3.scaleLinear().range([height, 0])
                    .domain([min4-0.125*(max4-min4), max4+0.125*(max4-min4)]);
                    return yScale4;
                case "Total Structures Destroyed":
                    const min5 = d3.min(data, d => d.totalStructuresDestroyed);
                    const max5 = d3.max(data, d => d.totalStructuresDestroyed)
                    const yScale5 = d3.scaleLinear().range([height, 0])
                    .domain([min5-0.125*(max5-min5), max5+0.125*(max5-min5)]);
                    return yScale5;
                default:
                    return yScale;
            }
        }

        

        const colorMap = {
            "Total Acres Burned": "#FF7F50",
            "Total Personnel Involved": "#FF281B",
            "Total Crews Involved": "#FDB750",
            "Total Injuries": "#B8390E",
            "Total Structures Destroyed": "#3B0918"
        };
    
        // Existing component code...
    
        const renderLegend = () => {
            const legendWidth = 200; // Width of the legend box
            const legendHeight = 100 // Height of the legend box
            const legendOffsetX = width-legendWidth+50; // Position X of the legend box
            const legendOffsetY = 50; // Position Y of the legend box
    
            return (
                <g transform={`translate(${legendOffsetX},${legendOffsetY})`}>
                    <rect width={legendWidth} height={legendHeight} fill="white" opacity="0.5"/>
                    {Object.keys(colorMap).map((key, index) => {
                        const y = 10 + index * 15;
                        return (
                            <g key={key} transform={`translate(10, ${y})`}>
                                <rect width={10} height={10} fill={colorMap[key]} />
                                <text x={20} y={10} style={{ fontSize: '10px' }}>{key}</text>
                            </g>
                        );
                    })}
                </g>
            );
        };
    

        
        return <g transform={`translate(${offsetX},${offsetY})`}>
            <line y2={height} stroke={`black`} />
            {yAxisScale.ticks().map( tickValue => {
                return <g key={tickValue} transform={`translate(-10, ${yAxisScale(tickValue)})`}>
                        <line x2={10} stroke='black' />
                        <text style={{ textAnchor:'end', fontSize:'12px' }}>
                        {tickValue}
                        </text>
                    </g> 
            })}
            <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(10, 0)rotate(0)`}>
                    {yLabel}
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
            <path d={line2(normalizedData)} stroke={"#FF281B"} strokeWidth={3} fill={"none"}
                opacity = {getLineOpacity(selectedAttr,'Total Personnel Involved')}
                onMouseEnter={(event)=> {
                    setSelectedAttr('Total Personnel Involved')
                    setyAxisScale(()=>getyAxisScale('Total Personnel Involved'));
                }} 
                onMouseOut={()=> {
                    setSelectedAttr(null);
                    setyAxisScale(()=>getyAxisScale(null));
                }} />
            <path d={line3(normalizedData)} stroke={"#FDB750"} strokeWidth={3} fill={"none"}
                opacity = {getLineOpacity(selectedAttr,'Total Crews Involved')}
                onMouseEnter={(event)=> {
                    setSelectedAttr('Total Crews Involved')
                    setyAxisScale(()=>getyAxisScale('Total Crews Involved'));
                }} 
                onMouseOut={()=> {
                    setSelectedAttr(null);
                    setyAxisScale(()=>getyAxisScale(null));
                }} />
            <path d={line4(normalizedData)} stroke={"#B8390E"} strokeWidth={3} fill={"none"}
                opacity = {getLineOpacity(selectedAttr,'Total Injuries')}
                onMouseEnter={(event)=> {
                    setSelectedAttr('Total Injuries')
                    setyAxisScale(()=>getyAxisScale('Total Injuries'));
                }} 
                onMouseOut={()=> {
                    setSelectedAttr(null);
                    setyAxisScale(()=>getyAxisScale(null));
                }} />
            <path d={line5(normalizedData)} stroke={"#3B0918"} strokeWidth={3} fill={"none"}
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

            {renderLegend()}

            </g>

}


function BarChart(props) {
    const { offsetX, offsetY, data, height, width, year, selectedCounty, setSelectedCounty } = props;

    // Sort and take the top 15 counties
    const topCounties = [...data].sort((a, b) => b.totalAcresBurned - a.totalAcresBurned).slice(0, 15);

    const xScale = scaleBand()
        .range([0, width])
        .domain(topCounties.map(d => d.county))
        .padding(0.1);

    const yScale = scaleLinear()
        .range([height, 0])
        .domain([0, max(topCounties, d => d.totalAcresBurned)])
        .nice();

    const getColor = (selectedCounty, county) => {
        return selectedCounty && county === selectedCounty ? "#F89700" : "#8B0000";
    };
    
    const title = "Top 10 Counties by Acres Burned in " + year;

    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            {/* Updated text description */}
            <text style={{ textAnchor: 'start', fontSize: '15px'}} transform={`translate(0, -10)`}>
                {title}
            </text>
            {/* X-axis*/}
            <line x1={0} x2={width} y1={height} y2={height} stroke='black'/>
            {topCounties.map(d => (
                <text key={d.county + "_label"}
                      x={xScale(d.county)+xScale.bandwidth() / 2}
                      y={height}
                      style={{ textAnchor: 'start', fontSize: '12px'}}
                      transform={`rotate(40 ${xScale(d.county)}, ${height})`}>
                    {d.county}
                </text>
            ))}
            {/* Y-axis */}
            <line y2={height} stroke='black'/>
            {yScale.ticks(5).map(tickValue => (
                <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
                    <line x2={10} stroke='black' />
                    <text style={{ textAnchor: 'end', fontSize: '10px' }}>
                        {tickValue}
                    </text>
                </g>
            ))}
            {/* Bars for each county */}
            {topCounties.map(d => (
                <rect key={d.county}
                      x={xScale(d.county)}
                      y={yScale(d.totalAcresBurned)}
                      width={xScale.bandwidth()}
                      height={height - yScale(d.totalAcresBurned)}
                      stroke="black"
                      fill={getColor(selectedCounty, d.county)}
                      onMouseEnter={() => setSelectedCounty(d.county)}
                      onMouseOut={() => setSelectedCounty(null)} />
            ))}
            
        </g>
    );
}


export {MultipleLineChart, BarChart};

function MyComponent() {
    return <div>My Component</div>;
  }
  
  export default MyComponent;

