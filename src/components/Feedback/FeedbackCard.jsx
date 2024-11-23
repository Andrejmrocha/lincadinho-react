import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const FeedbackCard = ({ remetente, destinatario, comentario, data }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <Box
      sx={{
        border: "1px solid #faf3f19b",
        borderRadius: "8px",
        backgroundColor: "#fff",
        maxWidth: "700px",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        margin: "10px 0",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar src={remetente.foto_url} alt={remetente.nome} />
        <Typography variant="body1">
          <strong>{remetente.nome}</strong> enviou feedback para{" "}
          <strong>{destinatario.nome}</strong>
        </Typography>
        <Avatar src={destinatario.foto_url} alt={destinatario.nome} />
      </Box>

      <Typography
        variant="body2"
        sx={{ marginBottom: 1, textAlign: "justify" }}
      >
        {comentario}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="caption" color="textSecondary">
          {data}
        </Typography>
      </Box>
    </Box>
  );
};

export default FeedbackCard;
