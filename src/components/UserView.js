import React, { useContext } from "react";
import MovieCard from "../components/MovieCard";
import UserContext from "../context/UserContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function UserView({ movieData }) {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <Row className="justify-content-center text-center m-5">
        <h2>Movies</h2>
      </Row>
      <Row className="justify-content-center">
        {movieData.map((movie) => (
          <MovieCard
            key={movie.id}
            productProp={movie}
            isAdmin={false}
          />
        ))}
      </Row>
    </Container>
  );
}