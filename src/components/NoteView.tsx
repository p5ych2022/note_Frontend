import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Flex } from './Flex.tsx';

function NoteView() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        

        const token = localStorage.getItem('token');
        if (!token) {
          alert('You must be logged in to view this note');
          navigate('/login');
          return; 
        }
        
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

        const response = await axios.get(`/api/note/${id}`,config);
        setNote(response.data.data);
      } catch (error) {
        console.error('Error fetching note', error.message);
        alert('Error fetching note: ' + (error.response?.data?.message || error.message));
      }
    };
    fetchNote();
  }, [id]);


  return (
    <Flex preset="centered" style={{ flexDirection: 'column' }}>
    {note ? (
      <Flex style={{ flexDirection: 'column', margin: '10px' }}>
        
        <Flex style={{ marginTop: '100px' }}>
          <h1>{note.title}</h1>
        </Flex>
        <Flex >
          <h3>Content</h3>
          <p className="border p-2 m-2">
            {note.content}
          </p>
        </Flex>

        
        {note.attachmentID && (
  <button onClick={() => downloadAttachment(note.attachmentID)}>Download Attachment</button>
)}
      </Flex>
    ) : (
      <Flex>No note found.</Flex>
    )}
  </Flex>
  );
};

function downloadAttachment(attachmentID) {
  const token = localStorage.getItem('token');
  axios.get(`/api/attachment/${attachmentID}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    responseType: 'blob'  // Important for handling binary data files
  })
  .then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const name = response.headers['content-disposition'].split('filename=')[1];
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);  // Optionally set a filename
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  })
  .catch(error => console.error('Download error', error));
}

export default NoteView;