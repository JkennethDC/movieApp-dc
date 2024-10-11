import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { UserProvider } from './context/UserContext';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// components
import AppNavbar from './components/AppNavbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Movies from './pages/Movies';
import Logout from './pages/Logout';
import Home from './pages/Home';

const App = () => {
    const [user, setUser] = useState({
        id: null,
        isAdmin: false,
    });

    const unsetUser = () => {
        localStorage.clear();
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`
            }
    })
    .then((res) => {
        const data = res.data

        if(data.auth !== "Failed") {
            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
                
            })
        } else {
            setUser({
                id: null,
                isAdmin: false
            });
        }
    })
    })

    

    return (
        <>
            <UserProvider value={{ user, setUser, unsetUser }}>
                <Router>
                    <AppNavbar />
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/movies" element={<Movies />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/logout" element={<Logout />} />
                        </Routes>
                    </Container>
                </Router>
            </UserProvider>
        </>
    );
};

export default App;
