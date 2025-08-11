import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Box } from '@mui/material';

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(Array.isArray(history) ? history : []);
      } catch (error) {
        setMeetings([]);
      }
    };
    fetchHistory();
  }, [getHistoryOfUser]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "white",
        color: "black",
        padding: 3,
        filter: "none",
        backdropFilter: "none",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      <IconButton
        onClick={() => routeTo("/home")}
        sx={{ mb: 3, color: "black", filter: "none" }}
      >
        <HomeIcon />
      </IconButton>

      {Array.isArray(meetings) && meetings.length > 0 ? (
        meetings.map((e, i) => (
          <Card
            key={i}
            variant="outlined"
            sx={{ mb: 2, filter: "none", color: "black" }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14, color: "black", filter: "none" }}
                gutterBottom
              >
                Code: {e.meetingCode}
              </Typography>
              <Typography sx={{ mb: 1.5, color: "black", filter: "none" }}>
                Date: {formatDate(e.date)}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography sx={{ mt: 2, color: "black" }} variant="body1">
          No meeting history found.
        </Typography>
      )}
    </Box>
  );
}


