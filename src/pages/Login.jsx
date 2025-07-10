import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulated login logic
    if (email === 'admin' && password === 'admin') {
      Cookies.set('Admin_access', 'dummy_token', { expires: 1 });
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <h2>Login Page</h2>
      <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
      <TextField fullWidth type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
      <Button fullWidth variant="contained" onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default Login;
