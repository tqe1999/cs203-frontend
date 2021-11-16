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

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

/** function displays table of employees or supervisors. it also allows users to add, update and delete displayed users */
function EmployeeTable(props) {
    const [rows, setRows] = useState([{}])
    const [shop, setShop] = useState(null); 
    const [shops, setShops] = useState([])
    const [shopNames, setShopNames] = useState([])
    const [authority, setAuthority] = useState(null)

    useEffect(() => {

      AmplifyAPI.getUser().then(userProfile => {
        setShop(userProfile.shop); //go to shop.id later 
        setAuthority(userProfile.authorities[0].authority)
      });
      
      AmplifyAPI.getShops().then(result => {
        setShops(result)
        setShopNames(result.map(e =>  e.name))
      })

      setRows(props.companyTableData)
  }, []); 

      const selectRow = {
        mode: 'checkbox' //radio or checkbox
      };

      const onAddRow = (row) => {
        let newRow = row;

        let newShop = shop
        if (shop === null) {
          for (let i = 0; i < shops.length; i++) {
            if (shops[i].name == newRow.shopName) {
              newShop = shops[i]
            }
          }
        }

        const newUser = { 
          "name": newRow.name,
          "shop": newShop,
          "email": newRow.email,
          "vaccinationStatus": newRow.vaccinationStatus,
          "swabTestResult": newRow.swabTestResult,
          "fetStatus": newRow.fetStatus,
          "authorities": newRow.authority,
        };

        AmplifyAPI.addNewUser(newUser)
        .then((result) => {

          const item = {
            name: newRow.name,
            email: newRow.email,
            shopName: newShop.name,
            vaccinationStatus: newRow.vaccinationStatus,
            swabTestResult: newRow.swabTestResult,
            fetStatus: newRow.fetStatus, 
            authority: newRow.authority,
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

        let newShop = shop
        if (shop === null) {
          for (let i = 0; i < shops.length; i++) {
            if (shops[i].name == updatedRow.shopName) {
              newShop = shops[i]
            }
          }
        }

          const updatedUser = { 
            "name": updatedRow.name,
            "shop": newShop,
            "email": updatedRow.email,
            "vaccinationStatus": updatedRow.vaccinationStatus,
            "swabTestResult": updatedRow.swabTestResult,
            "fetStatus": updatedRow.fetStatus,
            "authorities": updatedRow.authority,
          };

          //make api call here
          AmplifyAPI.updateUser(updatedRow.email, updatedUser)
          .then((result) => {
            // console.log(result);
          });
      }

      const options = {
        onAddRow: onAddRow,
        onDeleteRow: onDeleteRow,
        clickToSelectAndEditCell: true
      };

      const addEmployee = [ {
        value: 'ROLE_EMPLOYEE',
        text: 'ROLE_EMPLOYEE'
      }];

      const addSupervisor = [ {
        value: 'ROLE_SUPERVISOR',
        text: 'ROLE_SUPERVISOR'
      }];
      
    return (
        <div>
            <Container fluid>
            <div className="row clearfix">
            <BootstrapTable data={rows} options = {options} striped={true} hover={true} insertRow deleteRow selectRow = {selectRow} pagination search
  multiColumnSearch columnFilter exportCSV  cellEdit={ {
    mode: "click",
    blurToSave: true,
     afterSaveCell: onAfterSaveCell
   } }>

              <TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
              {/* {authority === "ROLE_ADMIN" || authority === "ROLE_PROF" ? 
              <TableHeaderColumn dataField="shopId" dataSort={true}>Shop ID</TableHeaderColumn> : null} */}
              {authority === "ROLE_ADMIN" || authority === "ROLE_PROF" ? 
              <TableHeaderColumn dataField="shopName" editable={ { type: 'select', readOnly: false, options: { values:  shopNames}}} dataAlign="center" dataSort={true}>Shop Name</TableHeaderColumn> : null}
              <TableHeaderColumn dataField="email" isKey={true} dataAlign="center" dataSort={true}>Email</TableHeaderColumn>
              {authority === "ROLE_ADMIN" ?
              <TableHeaderColumn dataField="authority"  editable={ { type: 'select', readOnly: true, options: { values:  addSupervisor}}} dataAlign="center" dataSort={true}>Authority</TableHeaderColumn> : 
              <TableHeaderColumn dataField="authority"  editable={ { type: 'select', readOnly: true, options: { values:  addEmployee}}} dataAlign="center" dataSort={true}>Authority</TableHeaderColumn> }
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