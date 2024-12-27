import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

import { useUser } from './UserContext';

function Login() {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(usernameOrEmail, password);
      // data = { accessToken: '...', tokenType: 'Bearer' }

      // Store token in localStorage (basic approach)
      localStorage.setItem('token', data.accessToken);
      setUser({ username: usernameOrEmail });
      // Redirect or do any post-login steps
      navigate('/');
    } catch (err) {
      console.error('Login failed', err);
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '300px' }}>
        <div>
          <label>Username or Email</label><br />
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
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
        <button style={{ marginTop: '1rem' }} type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
