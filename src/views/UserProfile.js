import React, { useState, useEffect } from "react";
import * as AmplifyAPI from "../amplify-cognito/AmplifyAPI";
import * as AmplifyAuth from "../amplify-cognito/AmplifyAuth";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";

/** function displays the user's profile. it allows the user to edit some personal information */
function User() {
  const [ name, setName ] = useState(null);
  const [ telegramHandle, setTelegramHandle ] = useState(null);
  const [ telegramSignUpToken, setTelegramSignUpToken ] = useState(null);
  const [ userProfile, setUserProfile ] = useState(new Map());
  const [ shopName, setShopName ] = useState(null)

  //for the Modal box 
  const [ showModal, setShowModal ] = useState(false)
  const [ message, setMessage ] = useState(null)
  
  // Called only upon the first render
  useEffect(() => {
    AmplifyAPI.getUser().then(userProfile => {
      
      setUserProfile(userProfile);
      setName(userProfile.name);
      setTelegramSignUpToken(userProfile.telegramSignUpToken);
      //setTelegramHandle(userProfile.telegramHandle);

      if (userProfile.shop !== null) {
        setShopName(userProfile.shop.name)
      }
    });
  }, [])
  
  // Called when button "Update Profile" is clicked
  const handleSubmit = (e) => {
    e.preventDefault();
    
    AmplifyAPI.updateUserProfile(name, telegramHandle).then(userProfile => {
      // console.log(userProfile);
    });

    setMessage("Profile successfully updated!")
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
    window.location.reload();
  }

  return (
    <>
      <Container fluid>
        <Row>
            <Col>
                <Card className="card-my">
                    <Card.Title as="h4">Welcome to your profile, {userProfile.name}!</Card.Title>
                </Card>
            </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          value={name}
                          defaultValue="-"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    {/*<Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Telegram Handle, e.g. @____</label>
                        <Form.Control
                          value={telegramHandle}
                          defaultValue="-"
                          type="text"
                          onChange={
                            (e) => setTelegramHandle(e.target.value)
                          }
                        ></Form.Control>
                      </Form.Group>
                        </Col>*/}
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>User Type</label>
                        <Form.Control
                          disabled
                          value={userProfile.userType}
                          defaultValue="-"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Vaccination Status</label>
                        <Form.Control
                          disabled
                          value={userProfile.vaccinationStatus}
                          defaultValue="-"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Swab Test Result</label>
                        <Form.Control
                          disabled
                          value={userProfile.swabTestResult}
                          defaultValue="-"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>FET Status</label>
                        <Form.Control
                          disabled
                          value={userProfile.fetStatus}
                          defaultValue="-"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Shop Name</label>
                        <Form.Control
                          disabled
                          value={shopName}
                          defaultValue="-"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="7">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          disabled
                          value={userProfile.email}
                          defaultValue="-"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>

                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              <Card.Body style={{ "align-item": "center" }}>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-0.jpg").default}
                    ></img>
                    <h5 className="title">{userProfile.name}</h5>
                  </a>
                  <p className="description">{userProfile.email}</p>
                  {/*<p className="description">{userProfile.telegramHandle}</p>*/}
                </div>
                <div style={{ display: "flex", "justify-content": "center" }}>
                  <Button
                    href={"https://telegram.me/Covid19_FnB_Bot?start="+telegramSignUpToken}
                    target="_blank"
                    className="btn-fill btn-sm pull-right"
                    type="button"
                    variant="info"
                  >
                    Connect Telegram
                  </Button>
                </div>
              </Card.Body>
              {/* <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div> */}
            </Card>
          </Col>
        </Row>
        <Modal show={showModal}>
            <Modal.Header>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>{message}</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default User;
