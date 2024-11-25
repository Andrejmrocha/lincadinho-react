import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Box,
  Typography,
  Grid2,
  Paper,
  Avatar,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { fetchOrganizationDetails } from "../slices/organizationSlice";
import OrganizationInsights from "../components/OrganizationInsights";
import RecentActivities from "../components/RecentAtivities";

const Organization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { organization, loading } = useSelector((state) => state.organization);
  const { user } = useSelector((state) => state.user);

  const organizationId = user?.empresa?.id;

  useEffect(() => {
    if (organizationId) {
      dispatch(fetchOrganizationDetails(organizationId));
    }
  }, [dispatch, organizationId]);

  if (loading || !organization) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container size={12} sx={{ mt: 4 }}>
      <Grid2 container size={12} spacing={2}>
        <Grid2 item size={3}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                alt={organization.nome}
                src={organization.logo_url}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                {organization.nome}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => navigate("/organizacao/editar")}
              >
                Editar Organização
              </Button>
            </Box>
          </Paper>
        </Grid2>

        <Grid2 item size={9}>
          <Grid2 container spacing={2}>
            <Grid2 item size={7}>
              <Paper sx={{ p: 3, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Insights da organização
                </Typography>
                <OrganizationInsights />
              </Paper>
            </Grid2>
            <Grid2 item size={5}>
              <Paper sx={{ p: 3, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Atividade Recente
                </Typography>
                <RecentActivities />
              </Paper>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Organization;
