import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { darkTheme } from "./themes";
import styled, { ThemeProvider } from "styled-components";
import { ReactNotifications } from 'react-notifications-component';
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from './pages/Register/Register';
import Weather from "./pages/Weather/Weather";
import ResetPass from './pages/ResetPass/ResetPass';
import EmailVerification from './pages/EmailVerification/EmailVerfication';
import ChangePass from './pages/ChangePass/ChangePass';

const axios = require('axios');
const StyledApp = styled.div``;
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <StyledApp>
        <div className="App">
          <Router>
            <ReactNotifications />
            <PageRoutes />
          </Router>
        </div>
      </StyledApp>
    </ThemeProvider>

  );
}

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/forgotpass" element={<ResetPass />} />
      <Route path="/changepass" element={<ChangePass />} />
      <Route path="/:email/:token" element={<EmailVerification />} />
    </Routes>
  )
}

export default App;
