import React, { useState, useEffect } from "react";
import * as AmplifyAPI from "../../amplify-cognito/AmplifyAPI";
import * as AmplifyAuth from "../../amplify-cognito/AmplifyAuth";


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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


function EmployeeTable(props) {
    const [rows, setRows] = useState([{}])
    const [company, setCompany] = useState(null);
    const [shop, setShop] = useState(null); 
    const [shops, setShops] = useState([])
    const [userType, setUserType] = useState(null);
    const [companyDropDown, setCompanyDropDown] = useState()

    useEffect(() => {

      AmplifyAPI.getUser().then(userProfile => {
        console.log(userProfile)
        setCompany(userProfile.company);
        setShop(userProfile.shop); //go to shop.id later 
        console.log(company);
      });
      
      AmplifyAPI.getShops().then(result => {
        setShops(result)
      })

      setRows(props.companyTableData)
      setUserType(props.userType)

      
  }, []); 

    const baseURL = API_BASE_URL.concat("/users/")

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

        let newCompany = null
        if (company !== null) {
          newCompany = company
        } else {
          newCompany = newRow.company
        }

        let newShop = shop
        if (shop === null) {
          for (let i = 0; i < shops.length; i++) {
            if (shops[i].id == newRow.shopId) {
              // console.log("shopId " + newRow.shopId)
              // console.log("HEY BIJ")
              newShop = shops[i]
            }
          }
        }
        // console.log("shop!! " + newShop)
        
        setUserType(userTypeOfNewUser);

        const newUser = { 
          "name": newRow.name,
          "company": newCompany,
          "shop": newShop,
          "email": newRow.email,
          "userType": userTypeOfNewUser,
          "vaccinationStatus": newRow.vaccinationStatus,
          "swabTestResult": newRow.swabTestResult,
          "fetStatus": newRow.fetStatus,
        };

        AmplifyAPI.addNewUser(newUser)
        .then((result) => {
          console.log(result);

          const item = {
            name: newRow.name,
            email: newRow.email,
            company: newCompany,
            shopId: newShop.id,
            userType: userTypeOfNewUser,
            vaccinationStatus: newRow.vaccinationStatus,
            swabTestResult: newRow.swabTestResult,
            fetStatus: newRow.fetStatus, 
          };
          setRows(
            rows => [...rows, item]
          );
        });

        AmplifyAuth.createCognitoAccount(newRow.email);
      }

      const onDeleteRow = (rowsData) => {
        let temp = [...rows]
        for (let i = 0; i < rowsData.length; i++) {

          AmplifyAPI.deleteUser(rowsData[i])
          .then((result) => {
            temp = temp.filter((row) => {
              return row.email !== rowsData[i];
            });
        
            setRows( temp );
          });
        }

        setRows( temp );
      }

      const onAfterSaveCell = (value) => {
        let updatedRow = value;

        let newCompany = null
        if (company !== null) {
          newCompany = company
        } else {
          newCompany = updatedRow.company
        }

        let newShop = shop
        if (shop === null) {
          for (let i = 0; i < shops.length; i++) {
            if (shops[i].id == updatedRow.shopId) {
              console.log("shopId " + updatedRow.shopId)
              console.log("HEY BIJ")
              newShop = shops[i]
            }
          }
        }
        console.log(newShop)

          const updatedUser = { 
            "name": updatedRow.name,
            "company": newCompany,
            "shop": newShop,
            "email": updatedRow.email,
            "userType": updatedRow.userType,
            "vaccinationStatus": updatedRow.vaccinationStatus,
            "swabTestResult": updatedRow.swabTestResult,
            "fetStatus": updatedRow.fetStatus,
          };

          //make api call here
          AmplifyAPI.updateUser(updatedRow.email, updatedUser)
          .then((result) => {
            // console.log("HELLO LOOK HERE")
            console.log(result);
          });

      }

      const options = {
        onAddRow: onAddRow,
        onDeleteRow: onDeleteRow,
        clickToSelectAndEditCell: true
      };

      const addEmployee = [ {
        value: 'Employee',
        text: 'Employee'
      }];

      const addSupervisor = [ {
        value: 'Supervisor',
        text: 'Supervisor'
      }];
    return (
        <div>
            <Container fluid>
            <Row>
                <Col>
                    <Card className="card-my">
                        <Card.Title as="h4">Employee Information</Card.Title>
                        <div>
                        {props.userType === "Supervisor" ? <div>Company:  {company}</div> : null}
                        </div>
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
              <TableHeaderColumn dataField="shopId" dataSort={true}>Shop ID</TableHeaderColumn> : null}
              {/* {props.userType === "Administrator" || props.userType === "Prof" ? 
              <TableHeaderColumn dataField="company" dataSort={true} dataFormat={priceFormatter}>Company</TableHeaderColumn> : null} */}
               
//               <TableHeaderColumn dataField="company" editable={ { type: 'select', readOnly: true, options: { values:  [ {
//                 value: company,
//                 text: company
//               }]}}} dataSort={true} dataFormat={priceFormatter} searchPlaceholder={company}>Company</TableHeaderColumn> : null}
              <TableHeaderColumn dataField="email" isKey={true} dataAlign="center" dataSort={true}>Email</TableHeaderColumn>
              {userType === "Administrator" ?
              <TableHeaderColumn dataField="userType"  editable={ { type: 'select', readOnly: true, options: { values:  addSupervisor}}} dataAlign="center" dataSort={true}>User Type</TableHeaderColumn> : 
              <TableHeaderColumn dataField="userType"  editable={ { type: 'select', readOnly: true, options: { values:  addEmployee}}} dataAlign="center" dataSort={true}>User Type</TableHeaderColumn> }
              <TableHeaderColumn dataField="vaccinationStatus" dataAlign="center" dataSort={true}>Vaccination Status</TableHeaderColumn>
              <TableHeaderColumn dataField="swabTestResult" dataAlign="center" dataSort={true}>Swab Test Result</TableHeaderColumn>
              <TableHeaderColumn dataField="fetStatus" dataAlign="center" dataSort={true}>FET Status</TableHeaderColumn>
          </BootstrapTable>
            </div>
            </Container>
        </div>
    )
    // placeholder = "HELLO" searchplaceholder = {props.userType === "Administrator" ? "Supervisor" : "Employee"}
}

export default EmployeeTable;