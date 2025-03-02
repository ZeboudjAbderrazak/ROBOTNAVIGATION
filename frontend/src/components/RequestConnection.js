import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Paper } from '@mui/material';

const RequestConnection = () => {
  const { request_id } = useParams();

  const approveConnection = () => {
    axios.post(`http://127.0.0.1:8000/requests/${request_id}/approve/`)
      .then(response => {
        alert("Connection approved!");
      })
      .catch(error => {
        console.error("There was an error approving the connection!", error);
      });
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Request Connection
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="body1" gutterBottom>
          Request ID: {request_id}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={approveConnection}
        >
          Approve Connection
        </Button>
      </Paper>
    </Container>
  );
};

export default RequestConnection;