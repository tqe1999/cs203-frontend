import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import axios from 'axios'
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
  Dropdown,
} from "react-bootstrap";

import { API_BASE_URL } from "../assets/constants/apiConstants";
// const baseURL = "http://localhost:8080/footfallData"
// const baseURL = "https://api.covfeed.link/footfallData"
// const baseURL = "http://jartest-env.eba-v2nmznvw.ap-southeast-1.elasticbeanstalk.com/footfallData"

function FootfallData() {

    const [resp, setResp] = useState([])
    const [footfallData, setFootfallData] = useState([])
    const [lastUpdateDate, setLastUpdateDate] = useState("")
    const [isChanged, setChanged] = useState(true)
    const [year, setYear] = useState("1 year")

    const baseURL = API_BASE_URL.concat("/footfallData")

    let months = []
    let totals = []
    let restaurants = []
    let fastFoodOutlets = []
    let caterers = []
    let others = []

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setResp(response.data.list)
            setFootfallData(response.data.list.slice(48, 60));
            setLastUpdateDate(response.data.lastUpdated);
        });
    }, []);
    
    if (footfallData) {
        // console.log(footfallData)
        const length = footfallData.length

        for (let i = 0; i < length; i++) {
            if (length > 24 && i%10==0) {
                months.push(footfallData[i].month)
            } else if (length <= 24 && length > 12 && i%2==0) {
                months.push(footfallData[i].month)
            } else if (length <= 12){
                months.push(footfallData[i].month)
            } else {
                months.push("")
            }
            totals.push(footfallData[i].total)
            restaurants.push(footfallData[i].restaurants)
            fastFoodOutlets.push(footfallData[i].fastFoodOutlets)
            caterers.push(footfallData[i].caterers)
            others.push(footfallData[i].otherPlaces)
        }
        // console.log(months)
        // console.log(totals)
        // console.log(others)
        console.log("im loading the month data " + isChanged)
    }

    //whenever i post, i dont get again... so how? 
    const postValues = () => {
        axios.post(baseURL)
        // .then((response) => {
        //     console.log(response)
        //     // setResp(response.data.list)
        //     // setFootfallData(response.data.list);
        //     // setLastUpdateDate(response.data.lastUpdated);
        //     // setChanged(response.data.isChanged);
        //     // console.log("yes i am executed")
            
        // })
        axios.get(baseURL).then((response) => {
            setResp(response.data.list)
            setFootfallData(response.data.list.slice(48, 60));
            setLastUpdateDate(response.data.lastUpdated);
            setChanged(response.data.isChanged);
            setYear("1 year")
            console.log("inside " + isChanged)
        });
        console.log("outside " + isChanged)
    }

    const setOneYear = () => {
        setFootfallData(resp.slice(48, 60))
        setYear("1 year")
    }

    const setTwoYears = () => {
        setFootfallData(resp.slice(36, 60))
        setYear("2 years")
    }

    const setFiveYears = () => {
        setFootfallData(resp)
        setYear("5 years")
    }

    return (
    <>
        <Container fluid>
            <Row>
            <Col lg="4" sm="6">
                <Card className="card-stats">
                <Card.Body>
                    <Row>
                    <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-chart text-warning"></i>
                        </div>
                    </Col>
                    <Col xs="7">
                        <div className="numbers">
                        <p className="card-category">BANANA</p>
                        <Card.Title as="h4">150GB</Card.Title>
                        </div>
                    </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                    <i className="fas fa-redo mr-1"></i>
                    Update Now
                    </div>
                </Card.Footer>
                </Card>
            </Col>
            <Col lg="3" sm="6">
                <Card className="card-stats">
                <Card.Body>
                    <Row>
                    <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger"></i>
                        </div>
                    </Col>
                    <Col xs="7">
                        <div className="numbers">
                        <p className="card-category">Errors</p>
                        <Card.Title as="h4">23</Card.Title>
                        </div>
                    </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                    <i className="far fa-clock-o mr-1"></i>
                    In the last hour
                    </div>
                </Card.Footer>
                </Card>
            </Col>
            </Row>


            <Row>
            <Col md="12">
                <Card >
                <Card.Header>
                    <Row>
                    <Col xs="9">
                        <Card.Title as="h4">Historical Footfall Levels</Card.Title>
                        <p className="card-category">From the Food and Beverage Index. Values are collated monthly in chained volume terms (2017=100)</p>
                    </Col>
                    <Col xs="3" className="card-my-col">
                    <Dropdown>
                    <Dropdown.Toggle
                        aria-expanded={false}
                        aria-haspopup={true}
                        data-toggle="dropdown"
                        id="yearSelector"
                        variant="default"
                        className="m-0"
                    >
                        <span className="no-icon">{year}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu aria-labelledby="yearSelector">
                        <Dropdown.Item
                        // href="#pablo"
                        onClick={(e) => setOneYear()}
                        >
                        1 year
                        </Dropdown.Item>
                        <Dropdown.Item
                        // href="#pablo"
                        onClick={(e) => setTwoYears()}
                        >
                        2 years
                        </Dropdown.Item>
                        <Dropdown.Item
                        // href="#pablo"
                        onClick={(e) => setFiveYears()}
                        >
                        5 years
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <div className="ct-chart" id="chartHours">
                    <ChartistGraph
                        data={{
                        labels: months,
                        series: [
                            totals,
                            restaurants,
                            fastFoodOutlets,
                            caterers,
                            others,
                        ],
                        }}
                        type="Line"
                        options={{
                        low: 0,
                        high: 120,
                        showArea: false,
                        height: "245px",
                        axisX: {
                            showGrid: false,
                        },
                        lineSmooth: true,
                        showLine: true,
                        showPoint: true,
                        fullWidth: true,
                        chartPadding: {
                            right: 40,
                        },
                        }}
                        responsiveOptions={[
                        [
                            "screen and (max-width: 640px)",
                            {
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                return value[0];
                                },
                            },
                            },
                        ],
                        ]}
                    />
                    </div>
                </Card.Body>
                <Card.Footer>
                    <div className="legend">
                    <i className="fas fa-circle text-info"></i>
                    Overall   <i className="fas fa-circle text-danger"></i>
                    Restaurants   <i className="fas fa-circle text-warning"></i>
                    Fast Food Outlets     
                    <i className="fas fa-circle text-purple" ></i>
                    Caterers      
                    <i className="fas fa-circle text-light-green" ></i>
                    Cafes, Food Courts and Other Eating Places  
                    </div>
                    <hr></hr>
                    <div className="stats">
                    <i className="fas fa-history"></i>
                    Last updated on {lastUpdateDate}
                    </div>
                </Card.Footer>
                </Card>
            </Col>
            </Row>
            <Row>
            <Col lg="3" md="12">
                <Card className="card-my"> 
                <Card.Body>
                    <Button className="btn btn-round-my" onClick={() => postValues()} variant="default">
                    Update Values
                    </Button>
                </Card.Body>
                <Card.Footer>
                    <div className="stats">
                        <i className="fas fa-history"></i>
                        {isChanged && <i>Last updated on {lastUpdateDate}</i>}
                        {!isChanged && <i>Values are already up to date</i>}
                    </div>
                </Card.Footer>
                </Card>
            </Col>
            </Row>
        </Container>
    </>
    );
}

export default FootfallData;
