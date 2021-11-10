/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import { Auth } from 'aws-amplify';

import * as AmplifyAPI from "../../amplify-cognito/AmplifyAPI.js";
import * as AmplifyAuth from "../../amplify-cognito/AmplifyAuth.js";

import routes from "routes.js";

function Header() {
  const location = useLocation();
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            <div class="col-12 d-flex justify-content-end">
              <Nav.Item>
                <Nav.Link
                  className="m-0"
                  href="#pablo"
                  right="0"
                  onClick={(e) => AmplifyAuth.signOut()}
                >
                  <span className="no-icon"><b>Logout</b></span>
                </Nav.Link>
              </Nav.Item>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
