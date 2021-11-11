import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import ReadOnlyRow from "components/ReadOnlyRow/ReadOnlyRow";
import EditableRow from "components/EditableRow.js/EditableRow";
import NewsInput from "../components/News/NewsInput";
import * as AmplifyAPI from "../amplify-cognito/AmplifyAPI";

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

  const baseURL = API_BASE_URL.concat("/measures/");
  useEffect(() => {
    axios
      .get(baseURL, {
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
      .get(baseURL, {
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

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedMeasures = {
      typeOfShop: editMeasuresFormData.typeOfShop,
      dineInSize: editMeasuresFormData.dineInSize,
      maxGrpSizeVacc: editMeasuresFormData.maxGrpSizeVacc,
      maxGrpSizeNonVacc: editMeasuresFormData.maxGrpSizeNonVacc,
      socialDistance: editMeasuresFormData.socialDistance,
      closingTime: editMeasuresFormData.closingTime,
      phase: editMeasuresFormData.phase,
    };
    console.log(editedMeasures);

    AmplifyAPI.updateMeasures(editedMeasures)
    .then((result) => {
      console.log(result);
    });

    const newMeasuresTableData = [...measuresTableData];

    const index = newMeasuresTableData.findIndex(
      (measure) => measure.typeOfShop === editedMeasures.typeOfShop
    );

    newMeasuresTableData[index] = editedMeasures;
    setMeasuresTableData(newMeasuresTableData);
    setEditItemTypeOfShop(null);
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

  const handleCancelClick = () => {
    setEditItemTypeOfShop(null);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
            <Card className="card-my">
                <Card.Title as="h4">Edit Measures</Card.Title>
            </Card>
        </Col>
      </Row>
      {measuresTableData === null ? null : (
        <Row>
          <Col md="12">
            <Card className="striped-tabled-with-hover">
              <Card.Body className="table-full-width table-responsive px-0">
                <Form onSubmit={handleEditFormSubmit}>
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
                            <EditableRow
                              editFormData={editMeasuresFormData}
                              i={i}
                              handleEditFormChange={handleEditFormChange}
                              handleCancelClick={handleCancelClick}
                            ></EditableRow>
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
      <Row>
        <Col>
            <Card className="card-my">
                <Card.Title as="h4">Add News Articles </Card.Title>
            </Card>
        </Col>
      </Row>
      <NewsInput/>
    </Container>
  );
}

export default Gov;
