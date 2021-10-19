import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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
  Form,
  OverlayTrigger,
  Tooltip,
  Dropdown,
} from "react-bootstrap";

import './news-list.css';

const NewsDisplayItem = props => {
    const date = new Date(props.date[0], props.date[1] - 1, props.date[2]).toDateString()

    return (
        <li className="news-list">
        <Col lg="12" sm="12">
            <Card className="card-stats">
                <Card.Header>
                    <Card.Title as="h4">
                        {props.title}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className="news-description">
                        {props.description}
                    </div>
                </Card.Body>
                <Card.Footer>
                    <hr/>
                    <div className="stats">
                    <i className="fas fa-history"></i>
                    {date}
                    </div>
                </Card.Footer>
            </Card>
        </Col>
        </li>
    )
}

export default NewsDisplayItem;