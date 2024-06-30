import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register.tsx';
import Login from './components/Login.tsx';
import ListNotes from './components/NoteList.tsx';
import CreateNote from './components/NoteCreate.tsx';
import ViewNote from './components/NoteView.tsx';
import { useState } from 'react';
import Navbar from './components/Navbar.tsx';


const App: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/notes" element={isLoggedIn ? <ListNotes /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/create" element={isLoggedIn ? <CreateNote /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/note/view/:id" element={isLoggedIn ? <ViewNote /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
};
export default App;