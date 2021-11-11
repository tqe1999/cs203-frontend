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

const ShopTable = (props) => {
    const [rows, setRows] = useState([{}])
    
    const shopURL = API_BASE_URL.concat("/shops")

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
            console.log(result);

            const item = {
                name : newRow.name,
                shopType : newRow.shopType,
                area : newRow.area,
                numTables : newRow.numTables,
                sizeTables : newRow.sizeTables
            };
            console.log(item)

            setRows([...rows, item]);
        })

        AmplifyAuth.createCognitoAccount(newRow.email);
    }

    const onDeleteRow = (rowsData) => {
        let temp = [...rows]

        for (let i = 0; i < rowsData.length; i++) {
            AmplifyAPI.deleteShop(rowsData[i])
            .then((result) => {
                console.log(result)

                temp = temp.filter((row) => {
                    return row.name !== rowsData[i];
                });

                setRows(temp)
            })
        }

    }

    const onAfterSaveCell = (value) => {
        let newRow = value;
        AmplifyAPI.updateShop(newRow.name, {
            name : newRow.name,
            shopType : newRow.shopType,
            area : newRow.area,
            numTables : newRow.numTables,
            sizeTables : newRow.sizeTables
        }).then((result) => {
            console.log(result);
        })
    }

    const options = {
        onAddRow : onAddRow,
        onDeleteRow: onDeleteRow, 
        clickToSelectAndEditCell: true
    }

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
                <TableHeaderColumn dataField="id" dataSort={true}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataSort={true} isKey={true}>Name</TableHeaderColumn>
                <TableHeaderColumn dataField="shopType" dataSort={true}>Shop Type</TableHeaderColumn>
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