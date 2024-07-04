import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Flex } from './Flex.tsx';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');


      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      try {
        const response = await axios.get('/api/note/list', config);
        if (response.status === 200 && response.data.status === 'ok') {
          setNotes(response.data.data); 
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Session expired or invalid. Please login again.');
          navigate('/login');
        } else {
          //console.error('Error fetching notes', error);
        }
      }
    };
    fetchNotes();
  }, []);

  return (
    <Flex preset="centered" style={{ flexDirection: 'column' }}>
      <h1>Your Notes</h1>
      <ul>
        {notes.map((note) => (
            <Flex key={note.id} style={{margin:"5px"}}>
                <Link to={`/note/view/${note.id}`}>{note.title}</Link>
            </Flex>
        ))}
      </ul>
    </Flex>
  );
}

export default NoteList;