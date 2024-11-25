import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";

const OrganizationInsights = () => {
  // Dados mockados
  const insights = {
    totalUsers: 150,
    totalFeedbacks: 1200,
    topSender: {
      name: "João Silva",
      count: 50,
    },
    topReceiver: {
      name: "Maria Souza",
      count: 40,
    },
  };

  return (
    <Grid container spacing={2}>
      {/* Total de usuários */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Usuários Cadastrados
          </Typography>
          <Typography variant="h4">{insights.totalUsers}</Typography>
        </Paper>
      </Grid>

      {/* Total de feedbacks */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Feedbacks Enviados
          </Typography>
          <Typography variant="h4">{insights.totalFeedbacks}</Typography>
        </Paper>
      </Grid>

      {/* Usuário que mais enviou feedbacks */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Usuário com Mais Feedbacks Enviados
          </Typography>
          <Typography variant="h5">{insights.topSender.name}</Typography>
          <Typography variant="body2">
            Feedbacks enviados: {insights.topSender.count}
          </Typography>
        </Paper>
      </Grid>

      {/* Usuário que mais recebeu feedbacks */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Usuário com Mais Feedbacks Recebidos
          </Typography>
          <Typography variant="h5">{insights.topReceiver.name}</Typography>
          <Typography variant="body2">
            Feedbacks recebidos: {insights.topReceiver.count}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OrganizationInsights;
