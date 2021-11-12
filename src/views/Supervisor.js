import React, { useState, useEffect } from "react";

// react-bootstrap components
import {
  Container,
  Col,
  Row, 
  Card,
} from "react-bootstrap";

import "../components/Table/EmployeeTable.js"
import EmployeeTable from "../components/Table/EmployeeTable.js";


import * as AmplifyAPI from "../amplify-cognito/AmplifyAPI";
import * as AmplifyAuth from "../amplify-cognito/AmplifyAuth";

function Supervisor() {
  const [companyTableData, setCompanyTableData] = useState(null);
  const [shopName, setShopName] = useState(null)
  let tableData = []

  useEffect(() => {
      AmplifyAPI.getUser().then(userProfile => {
        AmplifyAPI.getByShopIdAndAuthorities(userProfile.shop.id, "ROLE_EMPLOYEE")
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
          setShopName(userProfile.shop.name)
        });
      });
      
  }, []); 
  

  return (
    
      <Container fluid>
          <Row>
              <Col>
                  <Card className="card-my">
                      <Card.Title as="h4">Employee Information for {shopName}</Card.Title>
                      <div>
                      {/* {props.userType === "Supervisor" ? <div>Company:  {company}</div> : null} */}
                      </div>
                  </Card>
              </Col>
          </Row>
          {companyTableData === null ? null : <EmployeeTable companyTableData = {companyTableData} userType = "Supervisor"/>}
      </Container>
  );
}

export default Supervisor;
