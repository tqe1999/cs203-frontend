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

/** function displays table of shops. it also allows users to add, update and delete shops */
const ShopTable = (props) => {
    const [rows, setRows] = useState([{}])

    useEffect(() => {
        setRows(props.shopTableData)
    }, [])

    const selectRow = {
        mode: 'checkbox' //radio or checkbox
      };

    const onAddRow = (row) => {
        let newRow = row;

        AmplifyAPI.addShop({
            name : newRow.name,
            shopType : newRow.shopType,
            area : newRow.area,
            numTables : newRow.numTables,
            sizeTables : newRow.sizeTables
        })
        .then((result) => {
            window.location.reload();

            const item = {
                id : "loading",
                name : newRow.name,
                shopType : newRow.shopType,
                area : newRow.area,
                numTables : newRow.numTables,
                sizeTables : newRow.sizeTables
            };

            setRows([...rows, item]);
        })
    }

    const onDeleteRow = (rowsData) => {
        let temp = [...rows]

        for (let i = 0; i < rowsData.length; i++) {
            console.log(rowsData[i])
            AmplifyAPI.deleteShop(rowsData[i])
            .then((result) => {

                temp = temp.filter((row) => {
                    return row.id !== rowsData[i];
                });
                setRows(temp)
            })
        }
    }

    const onAfterSaveCell = (value) => {
        let newRow = value;
        AmplifyAPI.updateShop(newRow.id, {
            name : newRow.name,
            shopType : newRow.shopType,
            area : newRow.area,
            numTables : newRow.numTables,
            sizeTables : newRow.sizeTables
        }).then((result) => {
            // console.log(result);
        })
    }

    const options = {
        onAddRow : onAddRow,
        onDeleteRow: onDeleteRow, 
        clickToSelectAndEditCell: true
    }

    const shopTypes = ["restaurant", "fastfoodoutlet", "caterer", "other"];

    return (
        <div>
        <Container fluid>
            <Row>
                <Col>
                    <Card className="card-my">
                        <Card.Title as="h4">Shop Information</Card.Title>
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
                <TableHeaderColumn dataField="id" dataSort={true} isKey={true} editable={false}>ID (Assigned)</TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
                <TableHeaderColumn dataField="shopType" editable={ { type: 'select', readOnly: false, options: { values:  shopTypes}}} dataAlign="center" dataSort={true}>Shop Type</TableHeaderColumn>
                <TableHeaderColumn dataField="area" dataSort={true}>Area</TableHeaderColumn>
                <TableHeaderColumn dataField="numTables" dataSort={true}>Number of Tables</TableHeaderColumn>
                <TableHeaderColumn dataField="sizeTables" dataSort={true}>Size of Tables</TableHeaderColumn>
            </BootstrapTable>
            </div>
        </Container>
        </div>
    )
}

export default ShopTable