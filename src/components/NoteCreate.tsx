import React, { useState } from 'react';
import axios from 'axios';
import { Flex } from './Flex.tsx';

function NoteCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleSubmit = async () => {
    try {
        const response = await axios.post('/api/note/create', {
          title,
          content,
          attachments,
        });
        alert('Note created successfully with ID: ' + response.data.id);
      } catch (error) {
        alert('Failed to create note: ' + error.message);
      }
  };

  return (
    <Flex preset="centered" style={{ flexDirection: 'column' }}>
      <Flex style={{ margin: '10px' }}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      </Flex>
    <Flex style={{ margin: '10px' }}>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
    </Flex>
    <Flex style={{ margin: '10px' }}>
      <input type="file" multiple onChange={(e) => setAttachments([...e.target.files])} />
    </Flex>
    <Flex style={{ margin: '10px' }}>
      <button onClick={handleSubmit}>Create Note</button>
    </Flex>
  </Flex>
  );
};
export default NoteCreate;