import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import RobotList from './components/RobotList';
import RobotDetail from './components/RobotDetail';
import UpdateRobot from './components/UpdateRobot';
import CreateRobot from './components/CreateRobot';
import Login from './components/Login';
import Logout from './components/Logout';

// Import UserList, UserDetail, and RequestConnection if they exist
// import UserList from './components/UserList';
// import UserDetail from './components/UserDetail';
// import RequestConnection from './components/RequestConnection';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('access_token');

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Robot Management System
          </Typography>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/robots">
                Robots
              </Button>
              {/* Uncomment if you have a Users feature */}
              {/* <Button color="inherit" component={Link} to="/users">
                Users
              </Button> */}
              <Logout />
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/robots" element={<RobotList />} />
          <Route path="/robots/:robot_id" element={<RobotDetail />} />
          <Route path="/robots/:robot_id/update" element={<UpdateRobot />} />
          <Route path="/robots/create" element={<CreateRobot />} />
          {/* Uncomment if you have a Users feature */}
          {/* <Route path="/users" element={<UserList />} />
          <Route path="/users/:user_id" element={<UserDetail />} />
          <Route path="/requests/:request_id/approve" element={<RequestConnection />} /> */}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;