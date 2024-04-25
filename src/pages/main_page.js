import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { csv, json } from "d3";
import { Row, Col, Container } from "react-bootstrap";
import { groupByAirline, groupByAirport } from "./component/utils";
import { AirportMap }  from "./component/airportMap";
import { BarChart } from "./component/barChart";
import { AirportBubble} from "./component/airportBubble";


const csvUrl = 'https://gist.githubusercontent.com/james-shan/fb6d4b947413a11d0c7f3d9edb4014c3/raw/8b1559c0546799acb14eb647717af95207844bec/California_Fire_Incidents.csv';
const mapUrl = 'https://gist.githubusercontent.com/james-shan/726a2517d8b14e20ce28f0eb3bdab01c/raw/bc0ed711f1f7fcb17c6e9260ba8e6166ac2481c1/california_geomap.json';


function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.SourceLatitude = +d.SourceLatitude
                d.SourceLongitude = +d.SourceLongitude
                d.DestLatitude = +d.DestLatitude
                d.DestLongitude = +d.DestLongitude
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
    const [selectedAirline, setSelectedAirline]=React.useState(null);
    const barchart_width = 400;
    const barchart_height = 400;
    const barchart_margin = { top: 10, bottom: 50, left: 130, right: 10 };
    const barchart_inner_width = barchart_width - barchart_margin.left - barchart_margin.right;
    const barchart_inner_height = barchart_height - barchart_margin.top - barchart_margin.bottom;
    const map_width = 600;
    const map_height = 400;
    const hub_width = 400;
    const hub_height = 400;

    const routes = useData(csvUrl);
    const map = useMap(mapUrl);
    
    if (!map || !routes) {
        return <pre>Loading...</pre>;
    };
    let airlines = groupByAirline(routes);
    let airports = groupByAirport(routes);
    // console.log(cities);
    // console.log(airports);

    return (<Container >
            <Row className={"justify-content-md-left"}>
                <Col lg={10} >
                    <h1 className={styles.h1Style}>Airlines Routes</h1> 
                </Col>
            </Row> 
            <Row className={"justify-content-md-left"}>
                <Col lg={4}>
                    <h2>Airlines</h2>
                    <svg className={styles.svgStyle} id={"barchart"} width={barchart_width} height={barchart_height}>
                        <BarChart offsetX={barchart_margin.left} offsetY={barchart_margin.top} 
                            height={barchart_inner_height} width={barchart_inner_width} data={airlines}
                            selectedAirline={selectedAirline} setSelectedAirline={setSelectedAirline}
                        />
                    </svg>
                </Col>
                <Col lg={8}>
                    <h2>Airports</h2>
                    <svg className={styles.svgStyle} id={"map"} width={map_width} height={map_height}>
                        <AirportMap width={map_width} height={map_height} 
                            countries={map} airports={airports} routes={routes}
                            selectedAirline={selectedAirline}
                        />
                    </svg>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <h2>The Hub Cities</h2>
                    <svg className={styles.svgStyle} id={"bubble"} width={hub_width} height={hub_height}>
                        <AirportBubble width={hub_width} height={hub_height} 
                            routes={routes} selectedAirline={selectedAirline}
                        />
                    </svg>
                </Col>
            </Row> 
            </Container>)
}


export default CalFire