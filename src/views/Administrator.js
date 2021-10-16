import React, { useState, useEffect } from "react";
import axios from 'axios'

// react-bootstrap components
import {
  Container,
} from "react-bootstrap";


import { API_BASE_URL } from "../assets/constants/apiConstants";
import EmployeeTable from "../components/Table/EmployeeTable.js";

function Administrator() {
  const [companyTableData, setCompanyTableData] = useState(null);
  const baseURL = API_BASE_URL.concat("/employees/administrator/")

  useEffect(() => {
      axios
        .get(baseURL + "KFC", {
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
        })
        .then((result) => {
          console.log(result)
          setCompanyTableData(result.data)
        });
  }, []); 
  

  return (
    
      <Container fluid>
          {companyTableData === null ? null : <EmployeeTable companyTableData = {companyTableData} userType = "Administrator"/>}
      </Container>
  );
}

export default Administrator;
