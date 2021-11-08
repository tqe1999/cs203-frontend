import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import ChartistGraph from "react-chartist";
import axios from 'axios'
import useDidMountEffect from "assets/UseDidMountEffect";
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
import { getUserProfile, getUserInfo } from "../amplify-cognito/AmplifyAPI.js"


function FootfallData() {

    const [resp, setResp] = useState([])
    const [footfallData, setFootfallData] = useState(null)
    const [lastUpdateDate, setLastUpdateDate] = useState("")
    const [isChanged, setChanged] = useState(true)
    const [year, setYear] = useState("1 year")
    const [averages, setAverages] = useState(null)
    const [shopType, setShopType] = useState(null)

    const baseURL = API_BASE_URL.concat("/footfallData")
    //0=restaurants, 1=fastfoodoutlets, 2=caterer, 3=other

    let months = [], totals = [], restaurants = [], fastFoodOutlets = [], caterers = [], others = []
    let average = 0, foodAmt = 0, serviceStaff = 0, kitchenStaff = 0;

    useEffect(() => {
        console.log("EXECUTED useEffect 1")
        axios.get(baseURL).then((response) => {
            setResp(response.data.list)
            setFootfallData(response.data.list.slice(48, 60));
            setLastUpdateDate(response.data.lastUpdated);
            setAverages(response.data.averages)
            console.log(response)
        });

        //get user details 
        getUserProfile().then(userProfile => {
            console.log(userProfile.shop.shopType);
            const shop = userProfile.shop.shopType

            //0=restaurant, 1=fastfoodoutlet, 2=caterer, 3=other
            setShopType("Cafes, Food Courts and Other Eating Places")
            if (shop === "restaurant") {
                setShopType("Restaurants")
            } else if (shop === "fastfoodoutlet") {
                setShopType("Fast Food Outlets")
            } else if (shop === "caterer") {
                setShopType("Caterers")
            }
        });
    }, [isChanged]);

    if (footfallData) {
        console.log("EXECUTED if footfalldata")
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
    }

    if (shopType && averages) {
        console.log("EXECUTED if shopType")

        //0=restaurant, 1=fastfoodoutlet, 2=caterer, 3=other
        let i = 3
        if (shopType === "Restaurants") {
            i = 0
        } else if (shopType === "Fast Food Outlets") {
            i = 1
        } else if (shopType === "Caterers") {
            i = 2
        }

        average = Math.round(averages[i])
        foodAmt = average
        serviceStaff = Math.round(averages[i] * 0.8)
        kitchenStaff = Math.round(averages[i] * 1.2)
    }

    const postValues = () => {
        axios.post(baseURL)
        setChanged(!isChanged)
        setFootfallData(null)
        console.log("EXECUTED post")
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
            <Col>
                <Card className="card-my">
                    <Card.Title as="h4">Data for {shopType}</Card.Title>
                </Card>
            </Col>
            </Row>
            <Row>
            <Col lg="3" sm="6">
                <Card className="card-stats">
                <Card.Body>
                    <Row>
                    <Col xs="6">
                        <div className="numbers">
                        <Card.Title as="h4">Average Footfall</Card.Title>
                        </div>
                    </Col>
                    <Col xs="6">
                        <div className="icon-big text-center icon-warning">
                        <Card.Title as="h2">{average}%</Card.Title>
                        </div>
                    </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                    <i className="fas fa-history"></i>
                    Data averaged over 6 months
                    </div>
                </Card.Footer>
                </Card>
            </Col>
            <Col lg="3" sm="6">
                <Card className="card-stats">
                <Card.Body>
                    <Row>
                    <Col xs="6">
                        <div className="numbers">
                        <Card.Title as="h4">Kitchen Staff</Card.Title>
                        </div>
                    </Col>
                    <Col xs="6">
                        <div className="icon-big text-center icon-warning">
                        <Card.Title as="h2">{kitchenStaff}%</Card.Title>
                        </div>
                    </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                    <i className="fas fa-history"></i>
                    Data averaged over 6 months
                    </div>
                </Card.Footer>
                </Card>
            </Col>
            <Col lg="3" sm="6">
                <Card className="card-stats">
                <Card.Body>
                    <Row>
                    <Col xs="6">
                        <div className="numbers">
                        <Card.Title as="h4">Service Staff</Card.Title>
                        </div>
                    </Col>
                    <Col xs="6">
                        <div className="icon-big text-center icon-warning">
                        <Card.Title as="h2">{serviceStaff}%</Card.Title>
                        </div>
                    </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                    <i className="fas fa-history"></i>
                    Data averaged over 6 months
                    </div>
                </Card.Footer>
                </Card>
            </Col>
            <Col lg="3" sm="6">
                <Card className="card-stats">
                <Card.Body>
                    <Row>
                    <Col xs="6">
                        <div className="numbers">
                        <Card.Title as="h4">Amount of Food</Card.Title>
                        </div>
                    </Col>
                    <Col xs="6">
                        <div className="icon-big text-center icon-warning">
                        <Card.Title as="h2">{foodAmt}%</Card.Title>
                        </div>
                    </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                    <i className="fas fa-history"></i>
                    Data averaged over 6 months
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
                    <Button className="btn-fill pull-right" variant="info" onClick={() => postValues()}>
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
