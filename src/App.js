import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { UserProvider } from './context/UserContext';
import React, { useState } from 'react';

// components
import AppNavbar from './components/AppNavbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Movies from './pages/Movies';
import Logout from './pages/Logout';

const App = () => {
    const [user, setUser] = useState({
        id: '',
        isAdmin: false,
    });

    const unsetUser = () => {
        localStorage.clear();
    };

    return (
        <>
            <UserProvider value={{ user, setUser, unsetUser }}>
                <Router>
                    <AppNavbar />
                    <Container>
                        <Routes>
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
