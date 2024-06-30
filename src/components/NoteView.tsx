import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Flex } from './Flex.tsx';

function NoteView() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`/api/note/view/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error('Error fetching note', error.message);
      }
    };
    fetchNote();
  }, [id]);


  return (
    <Flex preset="centered" style={{ flexDirection: 'column' }}>
      {note ? (
      <Flex style={{ flexDirection: 'column', margin: '10px' }}>
        <h1>{note.title}</h1>
        <p>{note.content}</p>
        <Flex style={{ flexDirection: 'column' }}>
          {note.attachments.map((attachment) => (
          <Flex key={attachment} style={{ margin: '5px' }}>
            {attachment}
          </Flex>
        ))}
        </Flex>
      </Flex>
      ) : (
        <Flex>Loading...</Flex>
      )}
    </Flex>
  );
};

export default NoteView;