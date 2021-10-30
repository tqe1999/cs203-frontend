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

import { API_BASE_URL } from "../../assets/constants/apiConstants";



import * as AmplifyAPI from "../../amplify-cognito/AmplifyAPI";
import * as AmplifyAuth from "../../amplify-cognito/AmplifyAuth";

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


function EmployeeTable(props) {
    const [rows, setRows] = useState([{}])
    const [company, setCompany] = useState(null);

    useEffect(() => {

      AmplifyAPI.getUserProfile().then(userProfile => {
        setCompany(userProfile.company);
      });
      
      setRows(props.companyTableData)
  }, []); 

    const baseURL = API_BASE_URL.concat("/employees/")

      const priceFormatter = (cell, row) => {
        return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
      }

      const selectRow = {
        mode: 'checkbox' //radio or checkbox
      };

      const onAddRow = (row) => {
        let newRow = row;

        let userTypeOfNewUser = null;
        if (props.userType === "Administrator") {
          userTypeOfNewUser = "Supervisor";
        } else {
          userTypeOfNewUser = "Employee"
        }

        const newUser = { 
          "name": newRow.name,
          "company": company,
          "email": newRow.email,
          "userType": userTypeOfNewUser,
          "vaccinationStatus": newRow.vaccinationStatus,
          "swabTestResult": newRow.swabTestResult,
          "fetStatus": newRow.fetStatus,
        };

        axios.post(baseURL, newUser, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((result) => {
          console.log(result);

          const item = {
            name: newRow.name,
            email: newRow.email,
            company: company,
            userType: userTypeOfNewUser,
            vaccinationStatus: newRow.vaccinationStatus,
            swabTestResult: newRow.swabTestResult,
            fetStatus: newRow.fetStatus, 
          };
          setRows(
            rows => [...rows, item]
          );
        });
      }

      const onDeleteRow = (rowsData) => {
        let temp = [...rows]
        for (let i = 0; i < rowsData.length; i++) {

          axios.delete(baseURL + rowsData[i], {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }).then((result) => {
            temp = temp.filter((row) => {
              return row.email !== rowsData[i];
            });
        
            setRows( temp );
          });
  
          
        }

        setRows( temp );
        
      }

      const onAfterSaveCell = (value) => {
        console.log(value);
        let updatedRow = value;
          const updatedUser = { 
            "name": updatedRow.name,
            "company": company,
            "email": updatedRow.email,
            "userType": updatedRow.userType,
            "vaccinationStatus": updatedRow.vaccinationStatus,
            "swabTestResult": updatedRow.swabTestResult,
            "fetStatus": updatedRow.fetStatus,
          };



          //make api call here
          axios.put(baseURL + updatedRow.email, updatedUser, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((result) => {
            console.log(result);
          });

      }

      const options = {
        onAddRow: onAddRow,
        onDeleteRow: onDeleteRow,
        clickToSelectAndEditCell: true
      };

    return (
        <div>
            <Container fluid>
            <Row>
                <Col>
                    <Card className="card-my">
                        <Card.Title as="h4">Employee Information</Card.Title>
                    </Card>
                </Col>
            </Row>
            
            <div className="row clearfix">
            <BootstrapTable data={rows} options = {options} striped={true} hover={true} insertRow deleteRow selectRow = {selectRow} pagination search
  multiColumnSearch columnFilter exportCSV  cellEdit={ {
    mode: "click",
    blurToSave: true,
     afterSaveCell: onAfterSaveCell
   } }>
              <TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
              {props.userType === "Administrator" || props.userType === "Prof" ? 
              <TableHeaderColumn dataField="company" editable={false} dataSort={true} dataFormat={priceFormatter}>Company</TableHeaderColumn> : null}
              <TableHeaderColumn dataField="email" isKey={true} dataAlign="center" dataSort={true}>Email</TableHeaderColumn>
              <TableHeaderColumn dataField="userType" editable={false} dataAlign="center" dataSort={true}>User Type</TableHeaderColumn>
              <TableHeaderColumn dataField="vaccinationStatus" dataAlign="center" dataSort={true}>Vaccination Status</TableHeaderColumn>
              <TableHeaderColumn dataField="swabTestResult" dataAlign="center" dataSort={true}>Swab Test Result</TableHeaderColumn>
              <TableHeaderColumn dataField="fetStatus" dataAlign="center" dataSort={true}>FET Status</TableHeaderColumn>
          </BootstrapTable>
            </div>
            </Container>
        </div>
    )

}

export default EmployeeTable;