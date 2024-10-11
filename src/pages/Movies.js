import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";

export default function Movies() {
  const [movies, setMovies] = useState([]); 
  const [isAdmin, setIsAdmin] = useState(false); 
  const { user } = useContext(UserContext); 

  useEffect(() => {
    if (user && user.isAdmin) {
      setIsAdmin(true);
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/movies/getMovies`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = res.data;
      if (data && data.movies && Array.isArray(data.movies)) {
        setMovies(data.movies);
      } else {
        console.error("Error: movie data is not an array");
      }
    } catch (err) {
      console.error("Error fetching movies: ", err);
    }
  };
  
  useEffect(() => {
    console.log("user data: ", user)
    fetchData();
  }, []);
  


  if (isAdmin) {
    return (
      <AdminView
        movieData={movies} 
        fetchData={fetchData}
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
