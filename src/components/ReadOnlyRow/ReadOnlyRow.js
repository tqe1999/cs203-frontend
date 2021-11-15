import React from "react";
import { Button } from "react-bootstrap";

/** function returns read only rows for measures */
const ReadOnlyRow = ({ item, i, handleEditClick }) => {
  return (
    <tr key={i}>
      <td>{item.typeOfShop}</td>
      <td>{item.dineInSize}</td>
      <td>{item.maxGrpSizeVacc}</td>
      <td>{item.maxGrpSizeNonVacc}</td>
      <td>{item.socialDistance}</td>
      <td>{item.closingTime.slice(0,5)}</td>
      <td>{item.phase}</td>
      <td>
        <Button
          className="btn-fill btn-sm pull-right"
          type="button"
          variant="info"
          onClick={(event) => handleEditClick(event, item)}
        >
          Edit
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
