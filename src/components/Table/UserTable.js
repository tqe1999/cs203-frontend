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

function UserTable(props) {
    const [rows, setRows] = useState([{}])

    useEffect(() => {
      console.log(props.companyTableData)
      setRows(props.companyTableData)
  }, []); 

    const [editMode, setEditMode] = useState(false);

    const [addList, setAddList] = useState([])

    const [removeList, setRemoveList] = useState([])

    const handleChange = (e, idx) => {
        const { name, value } = e.target;
        const temp = [...rows];
        temp[idx][name] = value;
        setRows(
            temp
        );
      };
      const handleAddRow = () => {
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
      };

      const handleRemoveSpecificRow = (idx) => () => {
        const temp = [...rows]
        temp.splice(idx, 1)
        setRows( temp )
      }

      const saveTable = () => {
        setEditMode(false)
        setRows(rows);
      }

      const editTable = () => {
        setEditMode(true)
      }

    return (
        <div>
            <div className="container">
            <div className="row clearfix">
            <div>
            {editMode ? (
              <div>
                {rows.length !== 0 && (
                  <div>
                    
                      <Button align="right" onClick={saveTable}>
                        SAVE
                      </Button>
                 
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Button align="right" onClick={editTable}>
                  EDIT
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

                    {editMode ? 
                    rows.map((item, idx) => (
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
                            <input
                            type="text"
                            name="email"
                            value={rows[idx].email}
                            onChange={(e) => handleChange(e, idx)}
                            className="form-control"
                            required
                            />
                        </td>
                        <td>
                          {rows[idx].userType}
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
                            <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={handleRemoveSpecificRow(idx)}
                            >
                            Remove
                            </button>
                        </td>
                        </tr>
                    ))
                    :
                    rows.map((item, idx) => (
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
                            <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={handleRemoveSpecificRow(idx)}
                            >
                            Remove
                            </button>
                        </td>
                        </tr>
                    ))

                    }
                    </tbody>
                </Table>
                {editMode ? 
                <div>
                    <button onClick={handleAddRow} className="btn btn-primary">
                        Add Row
                    </button>
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

export default UserTable;