import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Button, Paper } from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/users/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        User List
      </Typography>
      <Paper elevation={3}>
        <List>
          {users.map(user => (
            <ListItem key={user.id}>
              <ListItemText primary={user.username} secondary={`Email: ${user.email}`} />
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/users/${user.id}`}
              >
                Details
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default UserList;