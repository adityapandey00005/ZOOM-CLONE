import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';

import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);

  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        filter: "none",
        backdropFilter: "none",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        fontSize: "18px",
        fontWeight: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* NavBar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#f5f5f5",
          filter: "none",
          backdropFilter: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 style={{ margin: 0, color: "black" }}>Apna Video Call</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => navigate("/history")}
            style={{ filter: "none", color: "black" }}
          >
            <RestoreIcon />
          </IconButton>
          <p style={{ margin: "0 10px", color: "black" }}>History</p>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
            style={{ color: "black" }}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Meet Container */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "40px",
          flexGrow: 1,
          filter: "none",
          backdropFilter: "none",
        }}
      >
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "black" }}>
            Providing Quality Video Call Just Like Quality Education
          </h2>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <TextField
              onChange={(e) => setMeetingCode(e.target.value)}
              id="outlined-basic"
              label="Meeting Code"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                color: "black",
                filter: "none",
                '& .MuiInputLabel-root': { color: "black" },
                '& .MuiOutlinedInput-root': {
                  color: "black",
                  backgroundColor: "white",
                  '& fieldset': { borderColor: "gray" },
                  '&:hover fieldset': { borderColor: "black" },
                  '&.Mui-focused fieldset': { borderColor: "black" },
                },
              }}
            />
            <Button
              onClick={handleJoinVideoCall}
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                color: "white",
                '&:hover': { backgroundColor: "#115293" },
                filter: "none",
              }}
            >
              Join
            </Button>
          </div>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            srcSet="/logo3.png"
            alt="Logo"
            style={{ maxWidth: "100%", height: "auto", filter: "none" }}
          />
        </div>
      </div>
    </div>
  );
}

export default withAuth(HomeComponent);
