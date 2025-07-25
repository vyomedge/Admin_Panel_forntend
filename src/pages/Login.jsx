import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { apiClient } from '../lib/api-client';

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Login = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await apiClient.post("/api/auth/login", data);

      const { token } = res.data;

      Cookies.set("Admin_access", token, { expires: 7 });

      navigate("/dashboard");

    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
    }
  };


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: { xs: '70vh', md: '70vh', lg: '95vh' },
        // background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        fontFamily: 'Akatab, Sans-serif',

      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            minHeight: isMobile ? 'auto' : '600px',
            maxWidth: '1000px',
            mx: 'auto',
            backgroundColor: '#ffffff',
          }}
        >
          {/* Left Panel */}
          <Box
            sx={{
              flex: 1,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#f8f9fa',
              order: isMobile ? 2 : 1,
            }}
          >

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Akatab, Sans-serif',
                  fontWeight: 600,
                  color: '#2c3e50',
                  border: '2px solid #e0e0e0',
                  borderRadius: '25px',
                  padding: '8px 16px',
                  display: 'inline-block',
                  fontSize: '14px',
                }}
              >
                poornam-event
              </Typography>
            </Box>

            {/* Login Form */}
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Akatab, Sans-serif',
                fontWeight: 600,
                color: '#2c3e50',
                mb: 2,
              }}
            >
              Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'Akatab, Sans-serif',
                    color: '#2c3e50',
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  Email
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Enter a valid email'
                    }
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#ffffff',
                      fontFamily: 'Akatab, Sans-serif',
                      '& fieldset': {
                        borderColor: '#e0e0e0',
                      },
                      '&:hover fieldset': {
                        borderColor: '#D7A10F',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#D7A10F',
                      },
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'Akatab, Sans-serif',
                    color: '#2c3e50',
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  Password
                </Typography>
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePassword}
                          edge="end"
                          sx={{ color: '#7f8c8d' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#ffffff',
                      fontFamily: 'Akatab, Sans-serif',
                      '& fieldset': {
                        borderColor: '#e0e0e0',
                      },
                      '&:hover fieldset': {
                        borderColor: '#D7A10F',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#D7A10F',
                      },
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'Akatab, Sans-serif',
                    color: '#2c3e50',
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  Select panel
                </Typography>
                <TextField
                  fullWidth
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                  {...register('panel', { required: 'panel is required' })}
                  error={!!errors.panel}
                  helperText={errors.panel?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#ffffff',
                      fontFamily: 'Akatab, Sans-serif',
                      '& fieldset': {
                        borderColor: '#e0e0e0',
                      },
                      '&:hover fieldset': {
                        borderColor: '#D7A10F',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#D7A10F',
                      },
                    },
                  }}
                >
                  <option value=""> Select Company </option>
                  <option value="event">Poornam Events</option>
                  <option value="vyomedge">VyomEdge Solutions</option>
                </TextField>
              </Box>



              {/* Submit Button */}
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: '#D7A10F',
                  color: '#ffffff',
                  fontFamily: 'Akatab, Sans-serif',
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: 50,
                  textTransform: 'none',
                  fontSize: '16px',
                  mb: 3,
                  '&:hover': {
                    backgroundColor: '#c4940e',
                  },
                }}
              >
                Login
              </Button>
            </form>
          </Box>

          {/* Right Panel - Logo Section */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#000D1E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              order: isMobile ? 1 : 2,
              minHeight: {
                xs: '120px',
                sm: '180px',
                md: '300px',
              },
              p: 2,
            }}
          >
            <Box
              component="img"
              src="logo.png"
              alt="logo"
              sx={{
                maxWidth: {
                  xs: '40%',
                  sm: '55%',
                  md: '90%',
                },
                maxHeight: {
                  xs: '40%',
                  sm: '50%',
                  md: '80%',
                },
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;