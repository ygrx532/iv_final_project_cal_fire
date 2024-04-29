import React from "react";
import { scaleLinear, scaleBand, area, max, min, curveBasis } from "d3";
import * as d3 from "d3";
import { NormalizeData } from "./utils";

function MultipleLineChart(props){
    const {offsetX, offsetY, width, height, data, selectedYear, setSelectedYear} = props;
        
        const[selectedAttr, setSelectedAttr] = React.useState(null);
        const normalizedData = NormalizeData(data);
        //console.log("multiple line:", normalizedData) 


        const xScale = d3.scaleBand().range([0, width]).domain(normalizedData.map(d => d.year));
        const yScale = d3.scaleLinear().range([height, 0]).domain([0, 1]).nice();
        const line1 = d3.line().x(d => xScale(d.year)).y(d => yScale(d.totalAcresBurned));
        const line2 = d3.line().x(d => xScale(d.year)).y(d => yScale(d.totalPersonelInvolved));
        const line3 = d3.line().x(d => xScale(d.year)).y(d => yScale(d.totalCrewsInvolved));
        const line4 = d3.line().x(d => xScale(d.year)).y(d => yScale(d.totalInjuries));
        const line5 = d3.line().x(d => xScale(d.year)).y(d => yScale(d.totalStructuresDestroyed));
        const xTicks = xScale.domain();
        const [yAxisScale, setyAxisScale] = React.useState(() => d3.scaleLinear().range([height, 0]).domain([0, 1]).nice());

        console.log(yAxisScale)


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
                case "Total Personel Involved":
                    const min2 = d3.min(data, d => d.totalPersonelInvolved);
                    const max2 = d3.max(data, d => d.totalPersonelInvolved)
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
                opacity = {getLineOpacity(selectedAttr,'Total Personel Involved')}
                onMouseEnter={(event)=> {
                    setSelectedAttr('Total Personel Involved')
                    setyAxisScale(()=>getyAxisScale('Total Personel Involved'));
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

function SymmetricBarChart(props) {
    const { offsetX, offsetY, data, height, width, selectedStation, setSelectedStation } = props;
        const xScale = scaleBand().range([0, width])
            .domain(data.map(d => d.station))
        const yScale1 = scaleLinear().range([height/2, 0])
            .domain([0, max(data, d => d.start > d.end? d.start:d.end)])
            .nice();
        const yScale2 = scaleLinear().range([0, height/2])
            .domain([0, max(data, d => d.start > d.end? d.start:d.end)])
            .nice();
        const getColor1 = (selectedStation, station) => {
                return selectedStation&&station===selectedStation ? "red" : "#99d594";
            };
        const getColor2 = (selectedStation, station) => {
                return selectedStation&&station===selectedStation ? "steelblue" : "#fc8d59";
            };
    
    return <g transform={`translate(${offsetX}, ${offsetY})`} >
        {/* the text needed is given as the following */}
        <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(${width/3}, 0)`}>
                {"Num. of ridders start from a station"}
        </text>
        {/* start your code here */}
        {<line y2={height/2} stroke='black'/>}
            {yScale1.ticks(5).map(tickValue => 
                <g key={tickValue+"up"} transform={`translate(-10, ${yScale1(tickValue)})`}>
                    <line x2={10} stroke='black' />
                    <text style={{ textAnchor:'end', fontSize:'10px' }} >
                        {tickValue}
                    </text>
                </g>
            )}
            { data.map( d =>
                <rect key={d.station+"barUp"} x={xScale(d.station)} y={yScale1(d.start)}
                width={xScale.bandwidth()} height={height/2-yScale1(d.start)} stroke="black" 
                fill={getColor1(selectedStation, d.station)} 
                onMouseEnter={() => setSelectedStation(d.station)} 
                onMouseOut={()=> setSelectedStation(null)} />  
            ) }

        <g transform={`translate(${0}, ${height/2})`}>
            {/* the text needed is given as the following */}
            <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(${width/3}, ${height/2+10})`}>
            {"Num. of ridders end into a station"}
            </text>
            {/* start your code here */}
            {data.map( d =>
                <rect key={d.station+"barDown"} x={xScale(d.station)} y={0}
                width={xScale.bandwidth()} height={yScale2(d.end)} stroke="black" 
                fill={getColor2(selectedStation, d.station)}
                onMouseEnter={() => setSelectedStation(d.station)} 
                onMouseOut={()=> setSelectedStation(null)} />
                )}
            {<line y2={height/2} stroke='black'/>}
            {yScale2.ticks(5).reverse().map(tickValue => 
                <g key={tickValue+"down"} transform={`translate(-10, ${yScale2(tickValue)})`}>
                    <line x2={10} stroke='black' />
                    <text style={{ textAnchor:'end', fontSize:'10px' }} >
                        {tickValue}
                    </text>
                </g>
            )}
        </g>
    </g>
}

function SymmetricAreaChart(props) {
    const { offsetX, offsetY, data, height, width } = props;
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const attr1 = "start";
    const attr2 = "end";
    const xScale = scaleBand().range([0, width]).domain(MONTH);
    const yScale1 = scaleLinear().range([height/2, 0]).domain([0, max(data, d => d[attr1])]);
    const yScale2 = scaleLinear().range([0, height/2]).domain([0, max(data, d => d[attr1])]);
    // console.log(d3.max(data, d => d[attr]));
    const p1 = area().x(d => xScale(d.month)).y0(height/2).y1(d => yScale1(d[attr1])).curve(curveBasis)(data);
    const p2 = area().x(d => xScale(d.month)).y0(0).y1(d => yScale2(d[attr2])).curve(curveBasis)(data);

    return <g transform={`translate(${offsetX}, ${offsetY})`} >
        {/* the text needed is given as the following */}
        <text style={{ textAnchor:'end', fontSize:'15px'}} transform={`translate(${width}, ${20})rotate(0)`}>
                {"Start"}
        </text>
        <text style={{ textAnchor:'end', fontSize:'15px'}} transform={`translate(${width*2/3}, ${-10})rotate(0)`}>
                {"Num. of riders over the year"}
        </text>
        <g transform={`translate(${offsetX}, ${offsetY+height/2})`}>
            <text style={{ textAnchor:'end', fontSize:'15px'}} transform={`translate(${width}, ${height/2-20})rotate(0)`}>
                {"End"}
        </text>
        </g>
        {/* start your code here */}
        {xScale.domain().map(tickValue =>
                    <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height+5})`}>
                        <line y2={10} stroke='black' />
                        <text style={{textAnchor: 'middle', fontSize:'10px' }} y={20}>
                            {tickValue}
                        </text>
                    </g>
                )}
        <path d={p1} fill={"lightgreen"} stroke={"black"} />
        {<line x1={0} y1={height/2} x2={width} y2={height/2} stroke='black'/>}
        {<line y2={height/2} stroke='black'/>}
        {yScale1.ticks(3).map(tickValue => 
            <g key={tickValue} transform={`translate(-10, ${yScale1(tickValue)})`}>
                <line x2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} >
                    {tickValue}
                </text>
            </g>
        )}
        <g transform={`translate(${offsetX}, ${offsetY+height/2})`}>
            <path d={p2} fill={"pink"} stroke={"black"} />
            {<line y2={height/2} stroke='black'/>}
            {yScale2.ticks(3).map(tickValue => 
                <g key={tickValue} transform={`translate(-10, ${yScale2(tickValue)})`}>
                    <line x2={10} stroke='black' />
                    <text style={{ textAnchor:'end', fontSize:'10px' }} >
                        {tickValue}
                    </text>
                </g>
            )}
        </g>
    </g>
}

export { MultipleLineChart, SymmetricAreaChart, SymmetricBarChart }

