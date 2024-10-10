import React, { useState, useContext, useEffect } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";
import UserContext from "../context/UserContext";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import MovieCard from "../components/MovieCard";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.isAdmin) {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/movies/getMovies`)
      .then(res => {
        const data = res.data;
        if (data && data.movies && Array.isArray(data.movies)) {
          setMovies(data.movies);
        } else {
          console.error("Error: movie data is not an array");
        }
      })
      .catch(err => {
        console.error("Error fetching movies: ", err);
      });
  }, []);

  if (isAdmin) {
    return (
      <AdminView
        movieData={movies}
        handleCreateMovie={(movie) => console.log("Create movie:", movie)}
        handleEditMovie={(id) => console.log("Edit movie with id:", id)}
        handleDeleteMovie={(id) => console.log("Delete movie with id:", id)}
      />
    );
  } else {
    return (
      <UserView
        movieData={movies}
      />
    );
  }
}