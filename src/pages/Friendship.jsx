import React from "react";
import FriendRequest from "../components/Friendship/FriendRequest";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import FriendsList from "../components/Friendship/FriendList";

const Friendship = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f7f9fc", // Fundo neutro
      }}
    >
      <Box
        sx={{
          width: "40%",
          overflowY: "auto",
          padding: 2,

          borderRight: "1px solid #e0e0e0", // Borda sutil
        }}
      >
        <AppBar
          position="static"
          sx={{ backgroundColor: "#3f51b5", marginBottom: "1rem" }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ color: "#ffffff" }}>
              Solicitações de amizade
            </Typography>
          </Toolbar>
        </AppBar>
        <FriendRequest />
      </Box>

      {/* Área principal */}
      <FriendsList />
    </Box>
  );
};

export default Friendship;
