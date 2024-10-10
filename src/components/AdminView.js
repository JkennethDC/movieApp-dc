import React from "react";
import MovieCard from "../components/MovieCard";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function AdminView({ movieData, handleCreateMovie, handleEditMovie, handleDeleteMovie }) {
  return (
    <Container>
      <Row className="justify-content-center">
        <button onClick={handleCreateMovie}>Create Movie</button>
      </Row>
      <Row className="justify-content-center">
        {movieData.map((movie) => (
          <MovieCard
            key={movie.id}
            productProp={movie}
            isAdmin={true}
          />
        ))}
      </Row>
    </Container>
  );
}