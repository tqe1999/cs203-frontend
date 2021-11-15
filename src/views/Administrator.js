import React, { useState, useEffect } from "react";

// react-bootstrap components
import {
  Container,
  Col,
  Row, 
  Card
} from "react-bootstrap";


import EmployeeTable from "../components/Table/EmployeeTable.js";

import * as AmplifyAPI from "../amplify-cognito/AmplifyAPI";
import * as AmplifyAuth from "../amplify-cognito/AmplifyAuth";

/** function allows administrators to view the list of all supervisors from all shops. administrators can also create, update or delete supervisors */
function Administrator() {
  const [companyTableData, setCompanyTableData] = useState(null);
  let tableData = []

  useEffect(() => {
      AmplifyAPI.getUser().then(userProfile => {
        AmplifyAPI.getByAuthorities("ROLE_SUPERVISOR")
        .then((result) => {
          for (let i = 0; i < result.length; i++) {
            const data = {
              name: result[i].name,
              email: result[i].email,
              shopName: result[i].shop.name,
              vaccinationStatus: result[i].vaccinationStatus,
              swabTestResult: result[i].swabTestResult,
              fetStatus: result[i].fetStatus, 
              authority: result[i].authorities[0].authority,
            };
            tableData.push(data)
          }
          setCompanyTableData(tableData)
        });
      });
      
  }, []); 
  

  return (
    
      <Container fluid>
        <Row>
              <Col>
                  <Card className="card-my">
                      <Card.Title as="h4">Supervisor Information</Card.Title>
                  </Card>
              </Col>
          </Row>
        {companyTableData === null ? null : <EmployeeTable companyTableData = {companyTableData} userType = "Administrator"/>}
      </Container>
  );
}

export default Administrator;
