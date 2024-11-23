import { Box, Typography, Button } from "@mui/material";

const RecentProjects = ({ projectName, projectDescription }) => {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: 2,
        margin: "1rem 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6">{projectName}</Typography>
      <Typography variant="body2" color="textSecondary">
        {projectDescription}
      </Typography>
      <Button variant="outlined" sx={{ marginTop: 1 }}>
        Avaliar
      </Button>
    </Box>
  );
};

export default RecentProjects;
