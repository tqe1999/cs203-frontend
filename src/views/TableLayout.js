import React, { Fragment, Component, useEffect, useState } from 'react';
import axios from 'axios'


import Chart from 'react-apexcharts';
import { API_BASE_URL } from "../assets/constants/apiConstants";
// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
  } from "react-bootstrap";


export default function TableLayout() {
    const baseURL = API_BASE_URL.concat("/tablelayout/")
    useEffect(() => {
        axios
        .post(baseURL, {
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
        })
        .then((result) => {

          console.log(result.data);

          let tableData = result.data;

          const resultant = []

          for (let i = 0; i < tableData.length; i++) {
            let dict = {}
            dict['name'] = i + 1;
            dict['data'] = tableData[i];

            resultant.push(dict);
          }
          setSeries(resultant);
        });

        
    }, []); 

    const [series, setSeries] = useState(null);

    const [options, setOptions] = useState({
        chart: {
          height: 100,
          type: 'heatmap'
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#008FFB'],
        title: {
          text: 'Recommended table arrangement'
        }
      });

    

    return (
        <div>
            {/* <Container fluid>
        <Row>
          <Col offset = {1} md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Company (disabled)</label>
                        <Form.Control
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                          placeholder="ZIP Code"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          cols="80"
                          defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                          that two seat Lambo."
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
      </Container> */}



           {series !== null ? 
        //    <div>DATA COLLECTED </div>
           <Fragment>
            <Chart
                options={options}
                series={series}
                type="heatmap"
                height={350}
            />
            </Fragment>
           : null}
        </div>
    )


}

// export default class LivePreviewExample extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       series: [
//         {
//           name: 'Net Profit',
//           data: [
//             { 'y': 30, 'x': 1 },
//             { 'x': 2, 'y': 40 },
//             { 'x': 3, 'y': 22 },
//             { 'x': 4, 'y': 82 },
//             { 'x': 5, 'y': 44 },
//             { 'x': 6, 'y': 87 },
//             { 'x': 7, 'y': 69 },
//             { 'x': 8, 'y': 53 },
//             // { x: '9', y: 64 },
//             // { x: '10', y: 5 },
//             // { x: '11', y: 72 },
//             // { x: '12', y: 88 },
//             // { x: '13', y: 15 },
//             // { x: '14', y: 67 },
//             // { x: '15', y: 55 },
//             // { x: '16', y: 22 },
//             // { x: '17', y: 43 },
//             // { x: '18', y: 41 }
//           ]
//         },
//         // {
//         //   name: 'Revenue',
//         //   data: [
//         //     { x: '7', y: 69 },
//         //     { x: '8', y: 53 },
//         //     { x: '9', y: 64 },
//         //     { x: '10', y: 5 },
//         //     { x: '11', y: 72 },
//         //     { x: '1', y: 30 },
//         //     { x: '2', y: 40 },
//         //     { x: '3', y: 22 },
//         //     { x: '16', y: 22 },
//         //     { x: '4', y: 82 },
//         //     { x: '5', y: 44 },
//         //     { x: '6', y: 87 },
//         //     { x: '12', y: 88 },
//         //     { x: '13', y: 15 },
//         //     { x: '14', y: 67 },
//         //     { x: '15', y: 55 },
//         //     { x: '17', y: 43 },
//         //     { x: '18', y: 41 }
//         //   ]
//         // },
//         // {
//         //   name: 'Growth',
//         //   data: [
//         //     { x: '1', y: 30 },
//         //     { x: '2', y: 40 },
//         //     { x: '13', y: 15 },
//         //     { x: '14', y: 67 },
//         //     { x: '15', y: 55 },
//         //     { x: '3', y: 22 },
//         //     { x: '4', y: 82 },
//         //     { x: '5', y: 44 },
//         //     { x: '6', y: 87 },
//         //     { x: '7', y: 69 },
//         //     { x: '8', y: 53 },
//         //     { x: '9', y: 64 },
//         //     { x: '10', y: 5 },
//         //     { x: '11', y: 72 },
//         //     { x: '12', y: 88 },
//         //     { x: '16', y: 22 },
//         //     { x: '17', y: 43 },
//         //     { x: '18', y: 41 }
//         //   ]
//         // }
//       ],
//       options: {
//         chart: {
//           height: 100,
//           type: 'heatmap'
//         },
//         dataLabels: {
//           enabled: false
//         },
//         colors: ['#008FFB'],
//         title: {
//           text: 'Recommended table arrangement'
//         }
//       }
//     };
//   }

//   render() {
//     return (
//       <Fragment>
//         <Chart
//           options={this.state.options}
//           series={this.state.series}
//           type="heatmap"
//           height={350}
//         />
//       </Fragment>
//     );
//   }
// }
