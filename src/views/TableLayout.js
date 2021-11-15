import React, { Fragment, Component, useEffect, useState } from 'react';
import * as AmplifyAPI from "../amplify-cognito/AmplifyAPI";

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

/** function returns table layout page, which allows users to key in the dimensions of the shop and tables to obtain an optimal arrangement */
export default function TableLayout() {
    const DEFAULT_SIZE = 750

    const [series, setSeries] = useState(null);

    const [widthOfTable, setWidthOfTable] = useState();

    const [lengthOfTable, setLengthOfTable] = useState();

    const [widthOfShop, setWidthOfShop] = useState();

    const [lengthOfShop, setLengthOfShop] = useState();

    const [tableGap, setTableGap] = useState(1);


    const [firstTime, setFirstTime] = useState(true);

    const [options, setOptions] = useState({
        chart: {
          height: 200,
          type: 'heatmap'
        },
        dataLabels: {
          enabled: true,
        },
        colors: ['#008FFB'],
        title: {
          text: 'Key for table size: width.length'
        }
      });

    const [tableWidth, setTableWidth] = useState(DEFAULT_SIZE);

    const [tableLength, setTableLength] = useState(DEFAULT_SIZE)

    const handleSubmit = (e) => {
    
        e.preventDefault();
        setFirstTime(false);

        const factor = widthOfShop / lengthOfShop
        if (factor > 1) {
          setTableWidth(DEFAULT_SIZE)
          setTableLength(1 / factor * DEFAULT_SIZE)
        } else if (factor < 1) {
          setTableWidth(factor * DEFAULT_SIZE)
          setTableLength(DEFAULT_SIZE)
        } else {
          setTableWidth(DEFAULT_SIZE)
          setTableLength(DEFAULT_SIZE)
        }

        const shopConfiguration = { 
            "widthOfShop": widthOfShop,
            "lengthOfShop": lengthOfShop,
            "widthOfTable": widthOfTable,
            "lengthOfTable": lengthOfTable,
            "tableGap": tableGap
          };

        AmplifyAPI.addTableLayout(shopConfiguration)
        .then((result) => {

          let tableData = result;

          const resultant = []

          for (let i = 0; i < result.length; i++) {
            let dict = {}
            dict['name'] = i + 1;
            dict['data'] = result[i];

            resultant.push(dict);
          }

          if (tableData == "") {
            setSeries(null);
          } else {
            setSeries(resultant);
          }
        });

    }

    const textCenter = {
      textAlign: "center",
  };

    

    return (
        <div>
            <Container fluid>
            <Row>
                <Col>
                    <Card className="card-my">
                      <Card.Title as="h4">Provide outlet information</Card.Title>
                    </Card>
                    <Card className="card-my">
                      <Card.Title as="h4">Please round all figures to integers. The table width and length should be a whole number between 1 and 9.</Card.Title>
                    </Card>
                </Col>
            </Row>
           
        <Row>
          <Col offset = {1} md="12">
            <Card>
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
                        min="1"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Length of shop (in metres)</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Shop Length"
                          type="number"
                          value={lengthOfShop}
                        onChange={e => setLengthOfShop(e.target.value)}
                        min="1"
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
                        min="1"
                        max = "9"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="3">
                      <Form.Group>
                      <label>Length of each table (in metres)</label>
                        <Form.Control
                          placeholder="Table Length"
                          type="number"
                          required
                          value={lengthOfTable}
                        onChange={e => setLengthOfTable(e.target.value)}
                        min="1"
                        max = "9"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Gap between each table (In terms of number of tables)</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Number of Tables"
                          type="number"
                          required
                          value={tableGap}
                          min="1"
                        onChange={e => setTableGap(e.target.value)}
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
        <p style={textCenter}>
        {series !== null ? 
            <div>
              <Row>
                <Col>
                    <Card className="card-my">
                        <Card.Title as="h4">Recommended Table Arrangement</Card.Title>
                    </Card>
                </Col>
              </Row>
              <div style={{width:tableWidth}}>
              <Fragment>
                <Chart
                    options={options}
                    series={series}
                    type="heatmap"
                    height={tableLength}
                />
                </Fragment>
              </div>
            </div>
           : null}
           
           {firstTime || series !== null ? null: <Card.Title as="h4">Your restaurant does not have enough space. Try with less tables. </Card.Title>}
                 </p>
      </Container>



           
        </div>
    )


}