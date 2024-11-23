import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

const FriendRequestCard = ({ name, photo, createdAt, onAccept, onDecline }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 1,
        marginBottom: 1,
        boxShadow: "none",
        border: "1px solid #e0e0e0", // Borda sutil
        backgroundColor: "#ffffff", // Fundo branco
      }}
    >
      <Avatar
        src={photo}
        alt={name}
        sx={{
          width: 40,
          height: 40,
          marginRight: 1,
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          padding: "4px 8px",
          "&:last-child": { paddingBottom: "4px" },
        }}
      >
        <Typography variant="subtitle1" sx={{ color: "#333333" }} noWrap>
          {name}
        </Typography>
        <Typography variant="caption" color="#757575">
          {createdAt}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={0.5}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4caf50", // Verde para "Aceitar"
              color: "#ffffff",
              "&:hover": { backgroundColor: "#45a047" }, // Efeito hover
              fontSize: "0.7rem",
              padding: "2px 8px",
            }}
            onClick={onAccept}
          >
            Aceitar
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#f44336", // Vermelho para "Recusar"
              color: "#f44336",
              "&:hover": { backgroundColor: "rgba(244,67,54,0.1)" }, // Efeito hover
              fontSize: "0.7rem",
              padding: "2px 8px",
            }}
            onClick={onDecline}
          >
            Recusar
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default FriendRequestCard;
