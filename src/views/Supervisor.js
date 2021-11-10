import React, { useState, useEffect } from "react";

// react-bootstrap components
import {
  Container
} from "react-bootstrap";


import { API_BASE_URL } from "../assets/constants/apiConstants";

import "../components/Table/EmployeeTable.js"
import EmployeeTable from "../components/Table/EmployeeTable.js";


import * as AmplifyAPI from "../amplify-cognito/AmplifyAPI";
import * as AmplifyAuth from "../amplify-cognito/AmplifyAuth";

function Supervisor() {
  const [companyTableData, setCompanyTableData] = useState(null);
  const baseURL = API_BASE_URL.concat("/users/")

  useEffect(() => {
      AmplifyAPI.getUser().then(userProfile => {
        console.log(userProfile);
        
        AmplifyAPI.getEmployeesUnderCompany(userProfile.company)
        .then((result) => {
          console.log(result)
          setCompanyTableData(result)
        });
      });
      
  }, []); 
  

  return (
    
      <Container fluid>
          {companyTableData === null ? null : <EmployeeTable companyTableData = {companyTableData} userType = "Supervisor"/>}
      </Container>
  );
}

export default Supervisor;
