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

    const [series, setSeries] = useState(null);

    const [widthOfTable, setWidthOfTable] = useState();

    const [heightOfTable, setHeightOfTable] = useState();

    const [widthOfShop, setWidthOfShop] = useState();

    const [heightOfShop, setHeightOfShop] = useState();

    const [numOfTables, setNumOfTables] = useState();

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

    const handleSubmit = (e) => {
        e.preventDefault();


        const shopConfiguration = { 
            "widthOfShop": widthOfShop,
            "heightOfShop": heightOfShop,
            "widthOfTable": widthOfTable,
            "heightOfTable": heightOfTable,
            "numOfTables": numOfTables,
           
          };

        axios
        .post(baseURL, shopConfiguration, {
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
        })
        .then((result) => {

          console.log(result);

          let tableData = result.data;

          

          const resultant = []

          for (let i = 0; i < tableData.length; i++) {
            let dict = {}
            dict['name'] = i + 1;
            dict['data'] = tableData[i];

            resultant.push(dict);
          }

          if (tableData == "") {
            setSeries(null);
          } else {
            setSeries(resultant);
          }
        });

    }

    

    return (
        <div>
            <Container fluid>
        <Row>
          <Col offset = {1} md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Provide your outlet information</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>Width of shop (in metres)</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Shop Width"
                          type="number"
                          value={widthOfShop}
                        onChange={e => setWidthOfShop(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Height of shop (in metres)</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Shop Height"
                          type="number"
                          value={heightOfShop}
                        onChange={e => setHeightOfShop(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="3">
                      <Form.Group>
                      <label>Width of each table (in metres)</label>
                        <Form.Control
                          placeholder="Table Width"
                          type="number"
                          required
                          value={widthOfTable}
                        onChange={e => setWidthOfTable(e.target.value)}
                          
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="3">
                      <Form.Group>
                      <label>Height of each table (in metres)</label>
                        <Form.Control
                          placeholder="Table Height"
                          type="number"
                          required
                          value={heightOfTable}
                        onChange={e => setHeightOfTable(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Number of Tables</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Company"
                          type="number"
                          required
                          value={numOfTables}
                        onChange={e => setNumOfTables(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick = {handleSubmit}
                  >
                    Recommend me!
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
      </Container>



           {series !== null ? 
           <Fragment>
            <Chart
                options={options}
                series={series}
                type="heatmap"
                height={350}
            />
            </Fragment>
           : <div>
               NO INFO / TOO MANY TABLES PROVIDED. PLEASE TRY AGAIN!
               </div>}
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
