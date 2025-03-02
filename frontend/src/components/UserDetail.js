import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper } from '@mui/material';

const UserDetail = () => {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/users/${user_id}/`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the user!", error);
      });
  }, [user_id]);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        User Detail
      </Typography>
      {user && (
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>
            {user.username}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {user.email}
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default UserDetail;