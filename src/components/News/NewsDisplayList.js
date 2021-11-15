import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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
import NewsDisplayItem from "./NewsDisplayItem";

/** function displays a list of 5 news articles */
const NewsDisplayList = props => {
    const newsArticles = props.articles
    
    if (newsArticles.length === 0) {
      return (
        <Card>
          Loading...
        </Card>
      )
    }

    return (
        <Row>
          {newsArticles.map(article => (
            <NewsDisplayItem 
              key={article.id}
              title={article.title}
              description={article.description}
              date={article.date}
              url={article.url}
              imageUrl={article.imageUrl}
            />
          ))}
        </Row>
    )
}

export default NewsDisplayList