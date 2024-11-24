import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid2,
} from "@mui/material";

// Mock de amizades
const mockFriends = [
  {
    id: 1,
    nome: "Ana Silva",
    foto_url: "https://via.placeholder.com/150/FF5733/FFFFFF?text=Ana",
  },
  {
    id: 2,
    nome: "Carlos Pereira",
    foto_url: "https://via.placeholder.com/150/33FF57/FFFFFF?text=Carlos",
  },
  {
    id: 3,
    nome: "Maria Oliveira",
    foto_url: "https://via.placeholder.com/150/5733FF/FFFFFF?text=Maria",
  },
  {
    id: 4,
    nome: "João Souza",
    foto_url: "https://via.placeholder.com/150/FFD700/000000?text=João",
  },
  {
    id: 5,
    nome: "Ana Silva",
    foto_url: "https://via.placeholder.com/150/FF5733/FFFFFF?text=Ana",
  },
  {
    id: 6,
    nome: "Carlos Pereira",
    foto_url: "https://via.placeholder.com/150/33FF57/FFFFFF?text=Carlos",
  },
  {
    id: 7,
    nome: "Maria Oliveira",
    foto_url: "https://via.placeholder.com/150/5733FF/FFFFFF?text=Maria",
  },
  {
    id: 8,
    nome: "João Souza",
    foto_url: "https://via.placeholder.com/150/FFD700/000000?text=João",
  },
];

const FriendCard = ({ friend, onMessage, onRemove }) => {
  return (
    <Card
      sx={{
        maxWidth: 200,
        boxShadow: 3,
        borderRadius: 3,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardMedia
        component="img"
        alt={friend.nome}
        height="140"
        image={friend.foto_url}
      />
      <CardContent>
        <Typography variant="h6" component="div" noWrap>
          {friend.nome}
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            size="small"
            color="primary"
            onClick={() => onMessage(friend.id)}
          >
            Mensagem
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => onRemove(friend.id)}
          >
            Remover
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const FriendsList = () => {
  const handleSendMessage = (friendId) => {
    alert(`Mensagem enviada para o amigo com ID: ${friendId}`);
  };

  const handleRemoveFriend = (friendId) => {
    alert(`Amigo com ID: ${friendId} foi removido!`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Suas Conexões
      </Typography>
      {mockFriends.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
          Você ainda não tem conexões. Envie solicitações para começar!
        </Typography>
      ) : (
        <Grid2 container spacing={3}>
          {mockFriends.map((friend) => (
            <Grid2 item size={3} key={friend.id}>
              <FriendCard
                friend={friend}
                onMessage={handleSendMessage}
                onRemove={handleRemoveFriend}
              />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default FriendsList;
