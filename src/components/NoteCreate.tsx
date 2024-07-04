import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Flex } from './Flex.tsx';


function NoteCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to create a note');
      navigate('/login');
      setIsSubmitting(false);
      return;
    }

    const config1 = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'  // Important for file upload
      }
    };

    const config2 = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    const noteData = {
      title: title,
      content: content
    };

    try {
      const response = await axios.post('/api/note/create', noteData, config1);
      //alert('Note created successfully with ID: ' + response.data.data.id);
      console.log('Note created successfully with ID: ' + response.data.data.id);
    
      const noteId = response.data.data.id;
      
      if (attachments) {
        const formData = new FormData();
        formData.append('noteId', noteId);
        formData.append('file', attachments[0]);

        await axios.post('/api/attachment/upload', formData, config2);
      alert('Note and attachment uploaded successfully');
    }}
     catch (error) {
      //console.error('Error creating note', error);
      alert('Error creating note: ' + (error.response?.data?.message || error.message));
    } finally {
    };
  }

  const handleFileChange = (e) => {
    setAttachments([...attachments, ...Array.from(e.target.files)]);
  };

  return (
 <form onSubmit={handleSubmit}>
      <Flex preset="centered" style={{ flexDirection: 'column' }}>
        <Flex style={{ marginTop: '100px' }}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        </Flex>
        <Flex style={{ margin: '10px' }}>
          <textarea 
            style={{ width: '400px', height: '300px' }}
            value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"
          />
        </Flex>
        <Flex style={{ margin: '10px' }}>
          <input 
            style={{ width: '400px', height: '60px' }}
            type="file" multiple onChange={handleFileChange}
          />
        </Flex>
        <Flex style={{ margin: '10px' }}>
          <button type="submit" disabled={isSubmitting}>Create Note</button>
        </Flex>
      </Flex>
    </form>
  );
};
export default NoteCreate;