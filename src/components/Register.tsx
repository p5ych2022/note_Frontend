import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Flex } from "./Flex.tsx";

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      username: username,
      password: password
    };

    try {
        const response = await axios.post('/api/register', payload);
        if (response.status === 200) {
            alert('Registration Successful');
            navigate('/login');
        }
        else {
          alert('Registration Failed' );
      }
    } catch (error) {
        console.error('Error during registration',error.response?.data || error.message);
        alert('Registration Failed: '+ (error.response?.data?.message || error.message));
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