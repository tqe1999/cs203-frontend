import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import * as AmplifyAPI from "../../amplify-cognito/AmplifyAPI";

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

import { API_BASE_URL } from "../../assets/constants/apiConstants";

function NewsInput () {

    //NewsArticleInput
    const [ date, setDate ] = useState(null)
    const [ description, setDescription ] = useState(null)
    const [ title, setTitle ] = useState(null)
    const [ url, setUrl ] = useState(null)
    const [ imageUrl, setImageUrl ] = useState(null)

    //Word Count for description 
    const [ wordCount, setWordCount ] = useState(0)

    const baseURL = API_BASE_URL.concat("/newsArticle")

    const handleKeyPress = (e) => {
        setWordCount(e.target.value.length)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit: Add News Article");

        AmplifyAPI.addNewsArticle(title, description, date, url, imageUrl)
        .then(newsArticle => {
          console.log(newsArticle);
        });
    }

    return (
        <Row>
          <Col md="12">
            <Card className="card-stats">
                <Card.Body>
                <Form onSubmit = {handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Title</label>
                        <Form.Control
                          value={title}
                          placeholder="Input your Title here"
                          type="text"
                          onChange={
                            (e) => setTitle(e.target.value)
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>Date</label>
                        <Form.Control
                          value={date}
                          type="date"
                          onChange={
                            (e) => setDate(e.target.value)
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="9">
                      <Form.Group>
                        <label>URL</label>
                        <Form.Control
                          value={url}
                          placeholder="Input your URL here"
                          type="text"
                          onChange={
                            (e) => setUrl(e.target.value)
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Description</label>
                        <Form.Control
                          value={description}
                          placeholder="Input your Description here"
                          as="textarea" rows={12}
                          onChange={
                            (e) => {
                                handleKeyPress(e)
                                setDescription(e.target.value)
                            }
                          }
                        ></Form.Control>
                        <label>Character count: {wordCount}</label>
                      </Form.Group>
                    </Col>
                  </Row>
                <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                >
                    Post News
                </Button>
                  <div className="clearfix"></div>
                </Form>
                </Card.Body>
                <Card.Footer>
                  
                </Card.Footer>
            </Card>
          </Col>
      </Row>
    )
}

export default NewsInput;