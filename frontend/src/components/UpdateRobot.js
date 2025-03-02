import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Box } from '@mui/material';

const UpdateRobot = () => {
  const { robot_id } = useParams();
  const [name, setName] = useState('');
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRobot = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`https://127.0.0.1:8000/api/robots/${robot_id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const robot = response.data;
        setName(robot.name);
        setPositionX(robot.position_x);
        setPositionY(robot.position_y);
        setIsConnected(robot.is_connected);
      } catch (error) {
        console.error('Error fetching robot:', error);
        setError('Failed to fetch robot details.');
      }
    };

    fetchRobot();
  }, [robot_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      await axios.patch(
        `https://127.0.0.1:8000/api/robots/${robot_id}/`,
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
      alert('Robot updated successfully!');
      navigate('/robots'); // Redirect to the robots list
    } catch (error) {
      console.error('Error updating robot:', error);
      setError('Failed to update robot. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Update Robot
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
              Update Robot
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateRobot;