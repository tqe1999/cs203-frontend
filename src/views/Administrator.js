import React, { useState, useEffect } from "react";

// react-bootstrap components
import {
  Container,
  Row, 
  Card
} from "react-bootstrap";


import { API_BASE_URL } from "../assets/constants/apiConstants";
import EmployeeTable from "../components/Table/EmployeeTable.js";

import * as AmplifyAPI from "../amplify-cognito/AmplifyAPI";
import * as AmplifyAuth from "../amplify-cognito/AmplifyAuth";

function Administrator() {
  const [companyTableData, setCompanyTableData] = useState(null);
  const baseURL = API_BASE_URL.concat("/users/administrator/")

  useEffect(() => {
      AmplifyAPI.getUser().then(userProfile => {
        AmplifyAPI.getEmployeesAndAdminsUnderCompany(userProfile.company)
        .then((result) => {
          setCompanyTableData(result)
        });
      });
      
  }, []); 
  

  return (
    
      <Container fluid>
        {companyTableData === null ? null : <EmployeeTable companyTableData = {companyTableData} userType = "Administrator"/>}
      </Container>
  );
}

export default Administrator;
