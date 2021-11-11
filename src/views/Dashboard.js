import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
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
import axios from "axios";
import NewsDisplayList from "components/News/NewsDisplayList";

import { API_BASE_URL } from "../assets/constants/apiConstants"
import * as AmplifyAPI from "../amplify-cognito/AmplifyAPI";

function Dashboard() {

  const [dineInSize, setDineInSize] = useState(null);
  const [maxGrpSizeVacc, setMaxGrpSizeVacc] = useState(null);
  const [maxGrpSizeNonVacc, setMaxGrpSizeNonVacc] = useState(null);
  const [socialDistance, setSocialDistance] = useState(null);
  const [closingTime, setClosingTime] = useState(null);
  const [phase, setPhase] = useState(null);

  const [newsArticles, setNewsArticles] = useState([])

  const measuresURL = API_BASE_URL.concat("/measures");
  const newsURL = API_BASE_URL.concat("/newsArticle")

  //measures
  useEffect(() => {
    AmplifyAPI.getUser().then(userProfile => {
      axios.get(measuresURL + "/" + userProfile.shop.shopType).then((response) => {
        const data = response.data;
        setDineInSize(data.dineInSize);
        setMaxGrpSizeVacc(data.maxGrpSizeVacc);
        setMaxGrpSizeNonVacc(data.maxGrpSizeNonVacc);
        setSocialDistance(data.socialDistance)
        setClosingTime(data.closingTime)
        setPhase(data.phase)
      })
      
    })
  }, []);

  //news
  useEffect(() => {
    console.log("enters useEffect news")
    axios.get(newsURL).then((response) => {
      console.log("DISPLAYING NEWS ARTICLES~~")
      console.log(response.data)
      setNewsArticles(response.data)
    })
  }, [])

  return (
    <>
      <Container fluid>
      <Row>
            <Col>
                <Card className="card-my">
                    <Card.Title as="h4">Current Measures</Card.Title>
                </Card>
            </Col>
        </Row>
        <Row>
          <Col lg="2" sm="6">
            <Card className="card-my-measures">
              <Card.Body className="card-my-measures">
                  <div className="numbers text-center">
                    <p className="card-category">Dine in size</p>
                    <Card.Title as="h4">{dineInSize}</Card.Title>
                  </div>
              </Card.Body>
              {/* <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer> */}
            </Card>
          </Col>
          <Col lg="2" sm="6">
            <Card className="card-my-measures">
              <Card.Body className="card-my-measures">
                  <div className="numbers text-center">
                    <p className="card-category">Vaccinated group size</p>
                    <Card.Title as="h4">{maxGrpSizeVacc}</Card.Title>
                  </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="2" sm="6">
            <Card className="card-my-measures">
              <Card.Body className="card-my-measures">
                  <div className="numbers text-center">
                    <p className="card-category">Unvaccinated group size</p>
                    <Card.Title as="h4">{maxGrpSizeNonVacc}</Card.Title>
                  </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="2" sm="6">
            <Card className="card-my-measures">
              <Card.Body className="card-my-measures">
                    <div className="numbers text-center">
                      <p className="card-category">Social distance</p>
                      <Card.Title as="h4">{socialDistance}</Card.Title>
                    </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="2" sm="6">
            <Card className="card-my-measures">
              <Card.Body className="card-my-measures">
                  <div className="numbers text-center">
                    <p className="card-category">Closing time</p>
                    <Card.Title as="h4">{closingTime}</Card.Title>
                  </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="2" sm="6">
            <Card className="card-my-measures">
              <Card.Body className="card-my-measures">
                  <div className="numbers text-center">
                    <p className="card-category">Phase</p>
                    <Card.Title as="h4">{phase}</Card.Title>
                  </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
            <Col>
                <Card className="card-my">
                    <Card.Title as="h4">Recent News Articles</Card.Title>
                </Card>
            </Col>
        </Row>
        <NewsDisplayList articles={newsArticles}/>
        
      </Container>
    </>
  );
}

export default Dashboard;
