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

        axios.post(shopURL, {
            name : newRow.name,
            shopType : newRow.shopType,
            area : newRow.area,
            numTables : newRow.numTables,
            sizeTables : newRow.sizeTables
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        }).then((result) => {
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
    }

    const onDeleteRow = (rowsData) => {
        let temp = [...rows]

        for (let i = 0; i < rowsData.length; i++) {
            axios.delete(shopURL + '/' + rowsData[i], {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                  },
            }).then((result) => {
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
        axios.put(shopURL + '/' + newRow.name, {
            name : newRow.name,
            shopType : newRow.shopType,
            area : newRow.area,
            numTables : newRow.numTables,
            sizeTables : newRow.sizeTables
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
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