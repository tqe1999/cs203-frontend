import React, { useState, useEffect } from "react";
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
} from "react-bootstrap";


import { API_BASE_URL } from "../assets/constants/apiConstants";

function Supervisor() {
  const [company, setCompany] = useState(null);
  const [companyTableData, setCompanyTableData] = useState(null);

  const baseURL = API_BASE_URL.concat("/users/")
//   useEffect(() => {
//     axios
//     .get(`http://localhost:8080/users/${company}`, {
//         headers: {
//         "Access-Control-Allow-Origin": "*"
//         },
//     })
//     .then((result) => {
//     console.log(result)
//     setCompanyTableData(result.data)
//     });
// }, [setCompany]);

  const handleSubmit = (e) => {
      e.preventDefault();
      setCompany(e.target[0].value);
      const value = e.target[0].value;
        axios
          // .get(`http://localhost:8080/users/${value}`, {
          .get(baseURL + value, {
             headers: {
                "Access-Control-Allow-Origin": "*"
             },
          })
          .then((result) => {
            console.log(result)
            setCompanyTableData(result.data)
          });
  }

  return (
    
      <Container fluid>
          <form onSubmit = {handleSubmit}>
            <label>
                Company Name:
                <input type="text" name="name" />
            </label>
            <div>
            <input type="submit" value="Submit" />
            </div>
            </form>
        {companyTableData === null ? null :
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">User details </Card.Title>
                <p className="card-category">
                  Under company {company === null ? null : company}
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">User Type</th>
                      <th className="border-0">Vaccination Status</th>
                      <th className="border-0">Swab Test Result</th>
                      <th className="border-0">FET Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyTableData.map((item, i) => {

                        return (
                        <tr key = {i}>

                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.userType}</td>
                            <td>{item.vaccinationStatus}</td>
                            <td>{item.swabTestResult}</td>
                            <td>{item.fetStatus}</td>
                        </tr>
                        
                        )}
                    
                    )}
                    
                    
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        }
      </Container>
    
    
  );
}

export default Supervisor;
