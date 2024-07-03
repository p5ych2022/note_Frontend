import React, { useState } from 'react';
import axios from 'axios';
import { Flex } from './Flex.tsx';

function NoteCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true); 

    try {
        const response = await axios.post('/api/note/create', {
          title,
          content,
          attachments,
        });
        alert('Note created successfully with ID: ' + response.data.id);
        console.log('Note created successfully with ID: ' + response.data.id);
      } catch (error) {
        alert('Failed to create note: ' + error.message);
        console.error('Failed to create note', error);
        console.log('Failed to create note: ' + error.message);
      }
      finally {
        setIsSubmitting(false); 
      }
  };

  return (
 <form onSubmit={handleSubmit}>
      <Flex preset="centered" style={{ flexDirection: 'column' }}>
        <Flex style={{ margin: '10px' }}>
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
            type="file" multiple onChange={(e) => setAttachments([...attachments, ...e.target.files])}
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