import { Avatar, Box, Button, Typography } from "@mui/material";

const SuggestedConnectionsCard = ({
  name,
  foto_url,
  onSendRequest,
  disabled,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 1,
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        marginBottom: 2,
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={foto_url}
          alt={name}
          sx={{ width: 50, height: 50, marginRight: 2 }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontSize: "1rem" }}>
            {name}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={onSendRequest}
        disabled={disabled}
        sx={{ textTransform: "none" }}
      >
        Conectar
      </Button>
    </Box>
  );
};

export default SuggestedConnectionsCard;
