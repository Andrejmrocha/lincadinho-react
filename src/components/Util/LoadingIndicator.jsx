import { Box, CircularProgress } from "@mui/material";

const LoadingIndicator = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full height of the viewport
        width: "100vw", // Full width of the viewport
        overflow: "hidden", // Prevent scrollbars
        position: "fixed", // Keep in the same place
        top: 0,
        left: 0,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingIndicator;
