import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Box } from '@mui/material';

const CreateRobot = () => {
  const [name, setName] = useState('');
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      await axios.post( // Removed the `response` variable
        'https://127.0.0.1:8000/api/robots/',
        {
          name,
          position_x: positionX,
          position_y: positionY,
          is_connected: isConnected,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Robot created successfully!');
      navigate('/robots'); // Redirect to the robots list
    } catch (error) {
      console.error('Error creating robot:', error);
      setError('Failed to create robot. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Create Robot
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Position X"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={positionX}
            onChange={(e) => setPositionX(parseFloat(e.target.value))}
            required
          />
          <TextField
            label="Position Y"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={positionY}
            onChange={(e) => setPositionY(parseFloat(e.target.value))}
            required
          />
          <Box mt={2}>
            <Button
              type="button"
              variant={isConnected ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setIsConnected(!isConnected)}
            >
              {isConnected ? 'Connected' : 'Disconnected'}
            </Button>
          </Box>
          {error && (
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Create Robot
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateRobot;