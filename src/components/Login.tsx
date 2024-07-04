import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Flex } from "./Flex.tsx";

const Login: React.FC<{ setIsLoggedIn: (loggedIn: boolean) => void }> = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    
    const payload = {
      username: username,
      password: password
    };

    e.preventDefault();
    try {
      const response = await axios.post('/api/login', payload);
      if (response.status === 200) {
        // Redirect to dashboar
        alert('Login Successful');
        setIsLoggedIn(true);
        localStorage.setItem('token', response.data.data.token);
        navigate('/notes');
      }
      else {
        alert('Login Failed');
      }
    } catch (error) {
      console.error('Error during login', error);
      alert('Login Failed: '+ (error.response?.data?.message || error.message));
    }

  };

  return (
    <Flex preset="centered" style={{ height: '80vh' }}>
      <div>
        <h1>Login page</h1>
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
            <button type="submit">Login</button>
          </Flex>
        </form>
      </div>
    </Flex>
  );
};
export default Login;