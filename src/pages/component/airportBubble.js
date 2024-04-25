import React from "react";
import { groupByCity } from "./utils";
import { forceSimulation, forceX, forceY, forceCollide, scaleLinear, min, max } from "d3";



function AirportBubble(props) {
    const { width, height, countries, routes, selectedAirline } = props;
    console.log(groupByCity(routes));
    
    if (selectedAirline) {
        let selectedRoutes = routes.filter(a => a.AirlineID === selectedAirline);
        let cities = groupByCity(selectedRoutes).sort((a, b) => a.Count - b.Count);
        let radiusScale = scaleLinear()
            .range([2, width * 0.15])
            .domain([min(cities, d => d.Count), max(cities, d => d.Count)]);

        let simulation = forceSimulation(cities)
            .force("x", forceX(width / 2).strength(0.02))
            .force("y", forceY(height / 2).strength(0.02))
            .force("collide", forceCollide(d => radiusScale(d.Count)))
            .velocityDecay(0.2)
            .tick(200);


        return (
            <g>
                {cities.map((city, idx) => {
                    const isTopHub = idx >= cities.length - 5;
                    return (
                        <React.Fragment key={idx}>
                            <circle 
                                cx={city.x}
                                cy={city.y}
                                r={radiusScale(city.Count)}
                                fill={isTopHub ? "#ADD8E6" : "#2a5599"}
                                stroke={"black"}
                                strokeWidth={"2"}
                            />
                            {isTopHub && (
                                <text
                                    x={city.x}
                                    y={city.y}
                                    style={{
                                        textAnchor: "middle", 
                                        stroke: "pink", 
                                        strokeWidth: "0.5em", 
                                        fill: "#992a2a", 
                                        fontSize: 16, 
                                        fontFamily: "cursive", 
                                        paintOrder: "stroke", 
                                        strokeLinejoin: "round"
                                    }}
                                >
                                    {city.City}
                                </text>
                            )}
                        </React.Fragment>
                    );
                })}
            </g>
        );
    } else {
        let cities = groupByCity(routes).sort((a, b) => a.Count - b.Count);
        let radiusScale = scaleLinear()
            .range([2, width * 0.15])
            .domain([min(cities, d => d.Count), max(cities, d => d.Count)]);

        let simulation = forceSimulation(cities)
            .force("x", forceX(width / 2).strength(0.02))
            .force("y", forceY(height / 2).strength(0.02))
            .force("collide", forceCollide(d => radiusScale(d.Count)))
            .velocityDecay(0.2)
            .tick(200);
          

        return (
            <g>
                {cities.map((city, idx) => {
                    const isTopHub = idx >= cities.length - 5;
                    return (
                        <React.Fragment key={idx}>
                            <circle 
                                cx={city.x}
                                cy={city.y}
                                r={radiusScale(city.Count)}
                                fill={isTopHub ? "#ADD8E6" : "#2a5599"}
                                stroke={"black"}
                                strokeWidth={"2"}
                            />
                            {isTopHub && (
                                <text
                                    x={city.x}
                                    y={city.y}
                                    style={{
                                        textAnchor: "middle", 
                                        stroke: "pink", 
                                        strokeWidth: "0.5em", 
                                        fill: "#992a2a", 
                                        fontSize: 16, 
                                        fontFamily: "cursive", 
                                        paintOrder: "stroke", 
                                        strokeLinejoin: "round"
                                    }}
                                >
                                    {city.City}
                                </text>
                            )}
                        </React.Fragment>
                    );
                })}
            </g>
        );
    }
}

export { AirportBubble }


function MyComponent() {
    return <div>My Component</div>;
  }
  
  export default MyComponent;