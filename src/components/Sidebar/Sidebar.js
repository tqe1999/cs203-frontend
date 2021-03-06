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

  const [authority, setAuthority] = useState();

  useEffect(() => {

    AmplifyAPI.getUser().then(userProfile => {
      setAuthority(userProfile.authorities[0].authority);
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
                src={require("assets/img/covfeedlogo.png").default}
                alt="..."
              />
            </div>
          </a>
          <a className="simple-text" href="http://www.creative-tim.com">
            Covfeed
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (prop.name === "Logout"){
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
                  onClick={(e) => AmplifyAuth.signOut()}
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
              )
            }
            if (authority === "ROLE_EMPLOYEE" && ((prop.name === "Supervisor Mgmt") || (prop.name === "Measures & News") || (prop.name === "Employee Mgmt") || (prop.name === "Shop Management"))) {
              return null;
            }

            if (authority === "ROLE_SUPERVISOR" && ((prop.name === "Supervisor Mgmt") || (prop.name === "Measures & News") || (prop.name === "Shop Management"))) {
              return null;
            }

            if (authority === "ROLE_ADMIN" && ((prop.name === "Employee Mgmt"))) {
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
