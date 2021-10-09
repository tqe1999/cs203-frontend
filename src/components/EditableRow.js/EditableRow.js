import React from "react";
import { Form, Button } from "react-bootstrap";

const EditableRow = ({ editFormData, handleEditFormChange }) => {
  return (
    <tr>
      <td>
        <Form.Control
          //defaultValue="Creative Code Inc."
          placeholder="E.g. Cafe"
          type="text"
          name="typeOfShop"
          value={editFormData.typeOfShop}
          onChange={handleEditFormChange}
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          //defaultValue="Creative Code Inc."
          placeholder="E.g. Cafe"
          type="text"
          name="dineInSize"
          value={editFormData.dineInSize}
          onChange={handleEditFormChange}
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          //defaultValue="Creative Code Inc."
          placeholder="E.g. Cafe"
          type="text"
          name="maxGrpSizeVacc"
          value={editFormData.maxGrpSizeVacc}
          onChange={handleEditFormChange}
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          //defaultValue="Creative Code Inc."
          placeholder="E.g. Cafe"
          type="text"
          name="maxGrpSizeNonVacc"
          value={editFormData.maxGrpSizeNonVacc}
          onChange={handleEditFormChange}
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          //defaultValue="Creative Code Inc."
          placeholder="E.g. Cafe"
          type="text"
          name="socialDistance"
          value={editFormData.socialDistance}
          onChange={handleEditFormChange}
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          //defaultValue="Creative Code Inc."
          placeholder="E.g. Cafe"
          type="text"
          name="closingTime"
          value={editFormData.closingTime}
          onChange={handleEditFormChange}
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          //defaultValue="Creative Code Inc."
          placeholder="E.g. Cafe"
          type="text"
          name="phase"
          value={editFormData.phase}
          onChange={handleEditFormChange}
        ></Form.Control>
      </td>
      <td>
        <Button
          className="btn-fill btn-sm pull-right"
          type="submit"
          variant="info"
          onClick={(event) => handleEditClick(event, item)}
        >
          Submit
        </Button>
      </td>
    </tr>
  );
};

export default EditableRow;
