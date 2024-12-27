import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';

function Register() {
  const navigate = useNavigate();

  // Fields according to RegisterDto: name, username, email, password
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(name, username, email, password);
      // response is a string from the backend (e.g. "User registered successfully")
      setSuccessMsg(response);
      setError('');
      // Optionally redirect to login after a short delay
      // setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Registration error', err);
      setSuccessMsg('');
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div>
          <label>Name</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <label>Username</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button style={{ marginTop: '1rem' }} type="submit">
          Sign Up
        </button>
      </form>
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Register;
