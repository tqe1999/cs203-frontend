import React from "react";
import { Form, Button } from "react-bootstrap";

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr>
      <td>{editFormData.typeOfShop}</td>
      <td>
        <Form.Control
          type="number"
          placeholder="E.g. Cafe"
          name="dineInSize"
          min="0"
          value={editFormData.dineInSize}
          onChange={handleEditFormChange}
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          type="number"
          placeholder="E.g. Cafe"
          name="maxGrpSizeVacc"
          min="0"
          value={editFormData.maxGrpSizeVacc}
          onChange={handleEditFormChange}
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          type="number"
          placeholder="E.g. Cafe"
          name="maxGrpSizeNonVacc"
          min="0"
          value={editFormData.maxGrpSizeNonVacc}
          onChange={handleEditFormChange}
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          type="number"
          placeholder="E.g. Cafe"
          name="socialDistance"
          min="0"
          value={editFormData.socialDistance}
          onChange={handleEditFormChange}
        ></Form.Control>
      </td>
      <td>
        <Form.Control
          //defaultValue="Creative Code Inc."
          placeholder="E.g. Cafe"
          type="time"
          name="closingTime"
          value={editFormData.closingTime}
          onChange={handleEditFormChange}
          step="60"
        ></Form.Control>
      </td>
      <td>
        <Form.Control
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
        >
          Save
        </Button>
        <Button
          className="btn-fill btn-sm pull-right"
          type="button"
          variant="info"
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
      </td>
    </tr>
  );
};

export default EditableRow;
