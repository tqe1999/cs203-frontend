import React from "react";
import { Button } from "react-bootstrap"

const ReadOnlyRow = ({ item, i , handleEditClick}) => {
  return (
    <tr key={i}>
      <td>{item.typeOfShop}</td>
      <td>{item.dineInSize}</td>
      <td>{item.maxGrpSizeVacc}</td>
      <td>{item.maxGrpSizeNonVacc}</td>
      <td>{item.socialDistance}</td>
      <td>{item.closingTime}</td>
      <td>{item.phase}</td>
      <td>
        <Button
          className="btn-fill btn-sm pull-right"
          type="submit"
          variant="info"
          onClick={(event) => handleEditClick(event, item)}
        >Edit</Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
