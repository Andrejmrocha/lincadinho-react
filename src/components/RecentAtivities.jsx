import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const RecentActivities = () => {
  // Dados mockados: intercalando feedbacks e novos usuários
  const activities = [
    { id: 1, type: "feedback", sender: "João Silva", receiver: "Maria Souza" },
    { id: 2, type: "user", name: "Lucas Oliveira", date: "23/11/2024" },
    { id: 3, type: "feedback", sender: "Ana Costa", receiver: "Carlos Lima" },
    { id: 4, type: "user", name: "Clara Mendes", date: "22/11/2024" },
    {
      id: 5,
      type: "feedback",
      sender: "Roberto Sá",
      receiver: "Paula Son",
    },
    { id: 6, type: "user", name: "Felipe Costa", date: "21/11/2024" },
  ];

  return (
    <List sx={{ p: 0 }}>
      {activities.map((activity) =>
        activity.type === "feedback" ? (
          <ListItem
            key={activity.id}
            sx={{
              p: 1,
              mb: 1,
              borderRadius: 1,
              backgroundColor: "#f5f5f5",
              boxShadow: 1,
            }}
          >
            <ListItemText
              primary={
                <Typography variant="body2" color="textPrimary">
                  {`${activity.sender} enviou feedback a ${activity.receiver}`}
                </Typography>
              }
            />
          </ListItem>
        ) : (
          <ListItem
            key={activity.id}
            sx={{
              p: 1,
              mb: 1,
              borderRadius: 1,
              backgroundColor: "#e3f2fd",
              boxShadow: 1,
            }}
          >
            <ListItemText
              primary={
                <Typography variant="body2" color="textPrimary">
                  {`${activity.name} concluiu seu cadastro e já pode trocar feedback com os colegas.`}
                </Typography>
              }
            />
          </ListItem>
        )
      )}
    </List>
  );
};

export default RecentActivities;
