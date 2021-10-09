import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import ReadOnlyRow from "components/ReadOnlyRow/ReadOnlyRow";
import EditableRow from "components/EditableRow.js/EditableRow";

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
} from "react-bootstrap";

import { API_BASE_URL } from "../assets/constants/apiConstants";

function Gov() {
  const [company, setCompany] = useState(null);
  const [measuresTableData, setMeasuresTableData] = useState(null);
  const [editMeasuresFormData, setEditMeasuresFormData] = useState({
    typeOfShop: "",
    dineInSize: 0,
    maxGrpSizeVacc: 0,
    maxGrpSizeNonVacc: 0,
    socialDistance: 0,
    closingTime: "",
    phase: "",
  });
  const [editItemTypeOfShop, setEditItemTypeOfShop] = useState(null);

  const baseURL = API_BASE_URL.concat("/users/");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/measures`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((result) => {
        console.log(result);
        setMeasuresTableData(result.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompany(e.target[0].value);
    const value = e.target[0].value;
    axios
      .get(`http://localhost:8080/measures`, {
        //.get(baseURL + value, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((result) => {
        console.log(result);
        setMeasuresTableData(result.data);
      });
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editMeasuresFormData };
    newFormData[fieldName] = fieldValue;
    setEditMeasuresFormData(newFormData);
  };

  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditItemTypeOfShop(item.typeOfShop);

    const formValues = {
      typeOfShop: item.typeOfShop,
      dineInSize: item.dineInSize,
      maxGrpSizeVacc: item.maxGrpSizeVacc,
      maxGrpSizeNonVacc: item.maxGrpSizeNonVacc,
      socialDistance: item.socialDistance,
      closingTime: item.closingTime,
      phase: item.phase,
    };

    setEditMeasuresFormData(formValues);
  };

  return (
    <Container fluid>
      {measuresTableData === null ? null : (
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Measures </Card.Title>
                <p className="card-category">
                  {company === null ? null : company}
                </p>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Type of Shop</label>
                        <Form.Control
                          //defaultValue="Creative Code Inc."
                          placeholder="E.g. Cafe"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Button
                        className="btn-fill btn-sm pull-right"
                        type="submit"
                        variant="info"
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                  <div className="clearfix"></div>
                </Form>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Form>
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">Type of Shop</th>
                        <th className="border-0">Dine In Size</th>
                        <th className="border-0">
                          Max Group Size (Vaccinated)
                        </th>
                        <th className="border-0">
                          Max Group Size (Unvaccinated)
                        </th>
                        <th className="border-0">Social Distance</th>
                        <th className="border-0">Closing Time</th>
                        <th className="border-0">Phase</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {measuresTableData.map((item, i) => (
                        <>
                          {editItemTypeOfShop === item.typeOfShop ? (
                            <EditableRow editFormData={editMeasuresFormData} handleEditFormChange={handleEditFormChange}></EditableRow>
                          ) : (
                            <ReadOnlyRow
                              item={item}
                              handleEditClick={handleEditClick}
                            ></ReadOnlyRow>
                          )}
                        </>
                      ))}
                    </tbody>
                  </Table>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Gov;
