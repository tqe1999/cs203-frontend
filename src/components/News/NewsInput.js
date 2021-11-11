import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import * as AmplifyAPI from "../../amplify-cognito/AmplifyAPI";
import axios from "axios";

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
  Modal,
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

    //for the Modal box 
    const [ showModal, setShowModal ] = useState(false)
    const [ message, setMessage ] = useState(null)

    const baseURL = API_BASE_URL.concat("/newsArticle")

    const handleKeyPress = (e) => {
        setWordCount(e.target.value.length)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setDescription("")
        setTitle("")
        setUrl("")
        setDate("")
        setImageUrl("")

        const append = wordCount > 256 ? "..." : ""
        AmplifyAPI.addNewsArticle({
            title : title,
            description : description.substring(0, 257) + append,
            date : new Date(date),
            url : url,
            imageUrl : imageUrl
        })
        .then(function (response) {
            setMessage("News Article successfully added!")
            setShowModal(true)
        }).catch(error => {
            setMessage("Oops, error occurred while trying to create news article. Try again later")
            setShowModal(true)
        })
    }

    const handleClose = () => {
      setShowModal(false)
    }

    return (
        <Row>
          <Col md="12">
            <Card className="card-stats">
                <Card.Body>
                <Form>
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
                    <Col className="pr-1" md="4">
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
                    <Col className="px-1" md="4">
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
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Image URL</label>
                        <Form.Control
                          value={imageUrl}
                          placeholder="Input your Image URL here"
                          type="text"
                          onChange={
                            (e) => setImageUrl(e.target.value)
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
                    type="reset"
                    variant="info"
                    onClick={(e) => {
                      handleSubmit(e)
                    }}
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
          <Modal show={showModal}>
            <Modal.Header>
              <Modal.Title>Add News Article</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>{message}</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
      </Row>
    )
}

export default NewsInput;