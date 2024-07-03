import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Flex } from './Flex.tsx';

function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('/api/notes/list');
        if (response.data && response.data.status === 200 && response.data.data) {
          setNotes(response.data.data.notes); 
        }
      } catch (error) {
        console.error('Error fetching notes', error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <Flex preset="centered" style={{ flexDirection: 'column' }}>
      <h1>Your Notes</h1>
      <ul>
        {notes.map((noteId) => (
            <Flex key={noteId} style={{ margin: '10px' }}>
                <Link to={`/note/view/${noteId}`}>{noteId}</Link>
            </Flex>
        ))}
      </ul>
    </Flex>
  );
}

export default NoteList;