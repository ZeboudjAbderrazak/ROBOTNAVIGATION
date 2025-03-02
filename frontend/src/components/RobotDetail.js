import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Typography, Button, Paper, Box } from '@mui/material';

const RobotDetail = () => {
  const { robot_id } = useParams();
  const [robot, setRobot] = useState(null);
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
        setRobot(response.data);
      } catch (error) {
        console.error('Error fetching robot:', error);
        setError('Failed to fetch robot details.');
      }
    };

    fetchRobot();
  }, [robot_id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`https://127.0.0.1:8000/api/robots/${robot_id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Robot deleted successfully!');
      navigate('/robots'); // Redirect to the robots list
    } catch (error) {
      console.error('Error deleting robot:', error);
      setError('Failed to delete robot. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Robot Detail
      </Typography>
      {robot && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            {robot.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Position: ({robot.position_x}, {robot.position_y})
          </Typography>
          <Typography variant="body1" gutterBottom>
            Status: {robot.is_connected ? 'Connected' : 'Disconnected'}
          </Typography>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/robots/${robot.id}/update`}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              sx={{ ml: 2 }}
            >
              Delete
            </Button>
          </Box>
        </Paper>
      )}
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default RobotDetail;