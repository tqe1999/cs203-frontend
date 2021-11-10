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
import React, { Component, useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "assets/img/reactlogo.png";

import * as AmplifyAPI from "../../amplify-cognito/AmplifyAPI.js";
import * as AmplifyAuth from "../../amplify-cognito/AmplifyAuth.js";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const [userType, setUserType] = useState();

  useEffect(() => {

    AmplifyAPI.getUser().then(userProfile => {
      setUserType(userProfile.userType);
    });
    
  }, []); 
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img
                src={require("assets/img/reactlogo.png").default}
                alt="..."
              />
            </div>
          </a>
          <a className="simple-text" href="http://www.creative-tim.com">
            Covid F&B
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            console.log(userType)
            console.log(prop.name);
            if (userType === "Employee" && ((prop.name === "Supervisor") || (prop.name === "Measures & News") || (prop.name === "Employees") || (prop.name === "Shops"))) {
              return null;
            }

            if (userType === "Supervisor" && ((prop.name === "Supervisor") || (prop.name === "Measures & News") || (prop.name === "Shops"))) {
              return null;
            }

            if (userType === "Admin" && ((prop.name === "Employees"))) {
              return null;
            }

            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
