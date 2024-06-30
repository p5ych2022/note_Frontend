import React, { useState } from 'react';
import axios from 'axios';
import { Flex } from "./Flex.tsx";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/register', { username, password });
      if (response.data.success) {
        // Redirect to login page
      }
    } catch (error) {
      console.error('Error during registration', error);
    }
  };

  return (
    <Flex preset="centered" style={{ height: '80vh' }}>
      <div>
        <h1>Register page</h1>
          <form onSubmit={handleSubmit}>
           <Flex preset="centered" style={{ flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Username" 
              required 
            />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required 
            />
            <button type="submit">Register</button>
          </Flex>
        </form>
      </div>
    </Flex>
  );
};

export default Register;