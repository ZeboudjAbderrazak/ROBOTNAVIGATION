import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import { ConnectedTv, LocationOn, PowerSettingsNew, Map as MapIcon, List as ListIcon } from '@mui/icons-material';
import RobotMap from './RobotMap';

const RobotList = () => {
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0); // 0 for list, 1 for map

  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('https://127.0.0.1:8000/api/robots/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRobots(response.data);
      } catch (error) {
        console.error('Error fetching robots:', error);
        setError('Failed to fetch robots. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRobots();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Robot List
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="List View" icon={<ListIcon />} />
        <Tab label="Map View" icon={<MapIcon />} />
      </Tabs>
      <Box sx={{ mt: 3 }}>
        {tabValue === 0 ? (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {robots.map((robot) => (
                <Grid item xs={12} sm={6} md={4} key={robot.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        {robot.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOn sx={{ mr: 1 }} />
                        Position: ({robot.position_x}, {robot.position_y})
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <PowerSettingsNew sx={{ mr: 1 }} />
                        Status: {robot.is_connected ? 'Connected' : 'Disconnected'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/robots/${robot.id}`}
                        startIcon={<ConnectedTv />}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        ) : (
          <RobotMap robots={robots} />
        )}
      </Box>
    </Container>
  );
};

export default RobotList;