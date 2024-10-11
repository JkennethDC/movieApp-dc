import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form, Row } from "react-bootstrap";
import { Notyf } from "notyf";
import axios from 'axios';

export default function AdminView({ movieData, fetchData }) {
  const [showModal, setShowModal] = useState(false);
  const [ movies, setMovies ] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    year: '',
    genre: '',
    director: '',
    description: '',
  });

  const notyf = new Notyf();

  useEffect(() => {
    const moviesArr = movieData.map(movie => (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.year}</td>
        <td>{movie.genre}</td>
        <td>{movie.director}</td>
        <td>{movie.description}</td>
      </tr>
    ))
    setMovies(moviesArr);
  }, [movieData])

  const handleShow = () => setShowModal(true);

  const handleClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleCreateMovie = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/movies/addMovie`, newMovie, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(newMovie)
    })
    .then((res) => {
      fetchData();
      handleClose();
      notyf.success('Movie created successfully');
      setNewMovie({ title: '', year: '', genre: '', director: '', description: ''})
    })
  };

  return (
    <Container >
        <h1 className="text-center">ADMIN DASHBOARD</h1>
      <Row className="justify-content-center m-5">
        <Button variant="success" onClick={handleShow}>
          Create Movie
        </Button>
      </Row>

      {/* Products on AdminView */}
      <h2 className="text-center my-4">Movies</h2>
        <Table striped bordered hover responsive>
            <thead>
                <tr className="text-center">
                    <th>Title</th>
                    <th>Year</th>
                    <th>Genre</th>
                    <th>Director</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {movies}
            </tbody>
        </Table>

      {/* Modal for creating a new movie */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter movie title"
                name="title"
                value={newMovie.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter release year"
                name="year"
                value={newMovie.year}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter genre"
                name="genre"
                value={newMovie.genre}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDirector">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter director name"
                name="director"
                value={newMovie.director}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter movie description"
                name="description"
                value={newMovie.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateMovie}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
