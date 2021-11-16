import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { DEFAULT_IMAGE_URL } from "../../assets/constants/apiConstants";

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

/** function displays one news article */
const NewsDisplayItem = props => {
    const date = new Date(props.date[0], props.date[1] - 1, props.date[2]).toDateString()

    const imageUrl = props.imageUrl ? props.imageUrl: DEFAULT_IMAGE_URL;
    const newsUrl = props.url ? props.url: "#";

    return (
        <Col xl="4" lg="6" md="4" sm="6" >
            <Card className="card-stats">
                <Card.Img variant="top" src={imageUrl} />
                <Card.Header>
                    <Card.Title as="h4">
                        {props.title}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className="news-description">
                        {props.description}
                    </div>
                    { props.url &&
                        <a className="news-link" href={newsUrl} target="_blank">
                            &#128279; Link to news article
                        </a>
                    }
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
    )
}

export default NewsDisplayItem;