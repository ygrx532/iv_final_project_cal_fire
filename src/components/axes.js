import React from "react";



function XAxis (props) {
    const { chartType, xScale, height, width, axisLable } = props;
    if (chartType === "scatter") {
        return <g>
            {<line x1={0} y1={height} x2={width} y2={height} stroke='black'/>}
            {xScale.ticks().map(tickValue =>
                <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height})`}>
                    <line y2={10} stroke='black' />
                    <text style={{textAnchor: 'middle', fontSize:'10px' }} y={20}>
                        {tickValue}
                    </text>
                </g>
            )}
            <text style={{ textAnchor:'end', fontSize:'15px'}} transform={`translate(${width}, ${height-10})`}>
                {axisLable}
            </text>
        </g>
    }
    if (chartType === "bar") {
        return <g>
            {<line x1={0} y1={height} x2={width} y2={height} stroke='black'/>}
            {xScale.domain().map(tickValue =>
                <g key={tickValue+'B'} transform={`translate(${xScale(tickValue)}, 0)`}>
                    <line y2={height} />
                    <text style={{textAnchor: 'start', fontSize:'10px' }} y={height+3} transform={`rotate(75, 0, ${height+3})`}>
                        {tickValue}
                    </text>
                </g>
            )}
        </g>
    }
}

function YAxis(props) {
    const { yScale, height, axisLable } = props;
    return <g>
        {<line y2={height} stroke='black'/>}
        {yScale.ticks().map(tickValue => 
            <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
                <line x2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} >
                    {tickValue}
                </text>
            </g>
        )}
    <text style={{ textAnchor:'end', fontSize:'15px'}} transform={`translate(20, 0)rotate(-90)`}>
        {axisLable}
    </text>
    </g>
    
}

export {XAxis, YAxis};

function MyComponent() {
    return <div>My Component</div>;
  }
  
  export default MyComponent;