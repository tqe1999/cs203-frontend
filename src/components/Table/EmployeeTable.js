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


function EmployeeTable(props) {
    const [rows, setRows] = useState([{}])
    const [company, setCompany] = useState(null);

    useEffect(() => {

      AmplifyAPI.getUserProfile().then(userProfile => {
        console.log(userProfile);
        
        setCompany(userProfile.company);
      });
      
      console.log(props.companyTableData)
      setRows(props.companyTableData)
  }, []); 

    const baseURL = API_BASE_URL.concat("/employees/")

    const [editMode, setEditMode] = useState(false);

    const [addRow, setAddRow] = useState(true)

    const [rowHasBeenAdded, setRowHasBeenAdded] = useState(false)

    const [rowHasBeenUpdated, setRowHasBeenUpdated] = useState(false)

    const [removeRow, setRemoveRow] = useState(true);

    const [rowToEdit, setRowToEdit] = useState(-10)


    const handleChange = (e, idx) => {
        const { name, value } = e.target;
        const temp = [...rows];
        temp[idx][name] = value;
        setRows(
            temp
        );


      };
      const handleAddRow = () => {
        setAddRow(false);
        setRemoveRow(false);
        const item = {
          name: "",
          email: "",
          userType: "Employee",
          vaccinationStatus: "",
          swabTestResult: "",
          fetStatus: "", 
        };
        setRows(
          rows => [...rows, item]
        );

        setRowToEdit(rows.length)
        setRowHasBeenAdded(true)

      };

      const handleRemoveSpecificRow = (idx) => () => {
        setEditMode(false)
        const temp = [...rows]
        console.log(idx)
        console.log(temp[idx])

        axios.delete(baseURL + temp[idx].email, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }).then((result) => {
          console.log(result);
        });
        //call api on temp[idx] to remove
        temp.splice(idx, 1)
        setRows( temp )
        
        
      }

      

      const saveTable = () => {
        setAddRow(true);
        setRemoveRow(true);
        setEditMode(false)
        setRows(rows);
        setRowToEdit(-10)

        if (rowHasBeenAdded) {
          let newRow = rows[rows.length - 1]
          const newUser = { 
            "name": newRow.name,
            "company": company,
            "email": newRow.email,
            "userType": newRow.userType,
            "vaccinationStatus": newRow.vaccinationStatus,
            "swabTestResult": newRow.swabTestResult,
            "fetStatus": newRow.fetStatus,
          };

          //make api call here
          axios.post(baseURL, newUser, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((result) => {
            console.log(result);
          });

          setRowHasBeenAdded(false);
        }

        if (rowHasBeenUpdated) {
          console.log(company + "HIIIIIIIIIIIIIIIIIIIIII");
          let updatedRow = rows[rowToEdit]
          const updatedUser = { 
            "name": updatedRow.name,
            "company": company,
            "email": updatedRow.email,
            "userType": updatedRow.userType,
            "vaccinationStatus": updatedRow.vaccinationStatus,
            "swabTestResult": updatedRow.swabTestResult,
            "fetStatus": updatedRow.fetStatus,
          };

          console.log(updatedUser)


          //make api call here
          axios.put(baseURL + updatedRow.email, updatedUser, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((result) => {
            console.log(result);
          });

          setRowHasBeenUpdated(false);
        }
        
        

      }

      const editTable = () => {
        setEditMode(true);
      }

      const editRow = (idx) => {
        setAddRow(false);
        setRemoveRow(false);
        setRowToEdit(idx) 
        setRowHasBeenUpdated(true);
      }

    return (
        <div>
            <div className="container">
            <div className="row clearfix">
            <div>
            {editMode ? (
              <div>
                {null}
              </div>
            ) : (
              <div>
                <Button align="right" variant="info" className="btn-fill pull-right" onClick={editTable}>
                  AMEND TABLE
                </Button>
              </div>
            )}
          </div>
                <div className="col-md-12 column">
                <Table className="table-hover table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User Type</th>
                        <th>Vaccination Status</th>
                        <th>Swab Test Result</th>
                        <th>FET Status</th>
                      </tr>
                    </thead>
                    <tbody>

                    {
                    rows.map((item, idx) => {
                    return editMode && idx == rowToEdit ?
                    (
                        
                        <tr id="addr0" key={idx}>
                        <td>
                            <input
                            type="text"
                            name="name"
                            value={rows[idx].name}
                            onChange={(e) => handleChange(e, idx)}
                            className="form-control"
                            required
                            />
                        </td>
                        <td>
                          {rowHasBeenAdded ? 
                          <input
                          type="text"
                          name="email"
                          value={rows[idx].email}
                          onChange={(e) => handleChange(e, idx)}
                          className="form-control"
                          required
                          />
                           : rows[idx].email}
                        </td>
                        <td>
                          {props.userType == "Supervisor" ? rows[idx].userType
                          : 
                          <input
                            type="text"
                            name="userType"
                            value={rows[idx].userType}
                            onChange={(e) => handleChange(e, idx)}
                            className="form-control"
                            required
                            />
                          }
                        </td>
                        <td>
                            <input
                            type="text"
                            name="vaccinationStatus"
                            value={rows[idx].vaccinationStatus}
                            onChange={(e) => handleChange(e, idx)}
                            className="form-control"
                            required
                            />
                        </td>
                        <td>
                            <input
                            type="text"
                            name="swabTestResult"
                            value={rows[idx].swabTestResult}
                            onChange={(e) => handleChange(e, idx)}
                            className="form-control"
                            required
                            />
                        </td>
                        <td>
                            <input
                            type="text"
                            name="fetStatus"
                            value={rows[idx].fetStatus}
                            onChange={(e) => handleChange(e, idx)}
                            className="form-control"
                            required
                            />
                        </td>
                        <td>
                          {(removeRow && rows[idx].userType == "Employee") ?
                            <Button
                            variant="info" className="btn-fill pull-right"
                            onClick={handleRemoveSpecificRow(idx)}
                            >
                            Remove
                            </Button> : null
                          }
                        </td>
                        <td>
                          {(removeRow && rows[idx].userType == "Employee") ?
                            <Button
                            variant="info" className="btn-fill pull-right"
                            onClick={() => editRow(idx)}
                            >
                            Edit
                            </Button> : null
                          }
                        </td>
                        </tr>
                    
                    ) : (
                         <tr id="addr0" key={idx}>
                        <td>
                            {rows[idx].name}
                        </td>
                        <td>
                            {rows[idx].email}
                        </td>
                        <td>
                            {rows[idx].userType}
                        </td>
                        <td>
                            {rows[idx].vaccinationStatus}
                        </td>
                        <td>
                            {rows[idx].swabTestResult}
                        </td>
                        <td>
                            {rows[idx].fetStatus}
                        </td>
                        <td>
                          {(props.userType == "Administrator" && editMode && removeRow) || (editMode && removeRow && rows[idx].userType == "Employee") ?
                            <Button
                            variant="info" className="btn-fill pull-right"
                            onClick={handleRemoveSpecificRow(idx)}
                            >
                            Remove
                            </Button> : <Button variant="info" className="btn-fill pull-right" disabled>Remove</Button>
                          }
                        </td>
                        <td>
                          {(props.userType == "Administrator" && editMode && removeRow) || (editMode && removeRow && rows[idx].userType == "Employee") ?
                            <Button
                            variant="info" className="btn-fill pull-right"
                            onClick={() => editRow(idx)}
                            >
                            Edit
                            </Button>  : <Button variant="info" className="btn-fill pull-right" disabled>Edit</Button>
                          }
                        </td>
                        </tr>
                    )
                  })
                    }
                    </tbody>
                </Table>
                {editMode ? 
                <div>
                    {addRow ?
                    <button onClick={handleAddRow} className="btn btn-primary">
                        Add Row
                    </button> : null
                    }
                    <button onClick={saveTable} className="btn btn-primary">
                        Save Table
                    </button>
                </div> : null
                }
                </div>
            </div>
            </div>
        </div>
    )

}

export default EmployeeTable;