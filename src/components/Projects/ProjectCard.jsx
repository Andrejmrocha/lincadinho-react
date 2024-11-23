import { Box, Button, Typography } from "@mui/material";
import React from "react";

const ProjectCard = ({ nomeProjeto, descricao }) => {
  return (
    <Box
      sx={{
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        padding: 2,
        marginBottom: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h6">{nomeProjeto}</Typography>
      <Typography variant="body2" color="textSecondary">
        {descricao}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: "none", marginTop: 1 }}
      >
        Avaliar
      </Button>
    </Box>
  );
};

export default ProjectCard;
