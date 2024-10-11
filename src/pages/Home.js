import React, { useState } from "react";
import { Carousel, Container, Card, Form, Row, Col } from "react-bootstrap";

export default function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Container fluid={true}>
      <div className="d-flex justify-content-center align-items-center vh-50 m-5" style={{ border: '15px solid black' }}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              src="https://picsum.photos/1600/900?random=1"
              alt="Random Landscape"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://picsum.photos/1600/900?random=2"
              alt="Random Landscape"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://picsum.photos/1600/900?random=3"
              alt="Random Landscape"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Card bg='dark' text='light' style={{ width: "80%", padding: "20px" }}>
          <h5>Looking for a movie?</h5>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formMovieTitle">
                  <Form.Label>Movie Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter movie title" />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formMovieYear">
                  <Form.Label>Year</Form.Label>
                  <Form.Control type="text" placeholder="Enter year" />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formMovieDirector">
                  <Form.Label>Director</Form.Label>
                  <Form.Control type="text" placeholder="Enter director's name" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </Container>
  );
}
