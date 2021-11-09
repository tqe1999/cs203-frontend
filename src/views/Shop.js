import React, { useState, useEffect } from "react";

// react-bootstrap components
import {
  Container,
  Row, 
  Card
} from "react-bootstrap";


import { API_BASE_URL } from "../assets/constants/apiConstants";
import ShopTable from "../components/Table/ShopTable.js";

import * as AmplifyAPI from "../amplify-cognito/AmplifyAPI";
import * as AmplifyAuth from "../amplify-cognito/AmplifyAuth";

const Shop = () => {
    const [shopTableData, setShopTableData] = useState(null)
    const shopURL = API_BASE_URL.concat("/shops") 

    useEffect(() => {
      AmplifyAPI.getShops().then(result => {
        setShopTableData(result);
      })
    }, []);
    
    return (
        <Container fluid>
            {shopTableData === null ? null :
            <ShopTable shopTableData={shopTableData}></ShopTable>}
        </Container>
    );

}

export default Shop