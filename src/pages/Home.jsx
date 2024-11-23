import {
  Grid2,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SuggestedConnectionsList from "../components/Connections/SuggestedConnectionsList";
import FeedbackList from "../components/Feedback/FeedbackList";
import ProjectList from "../components/Projects/ProjectList";

const Home = () => {
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleNavigateToOrganizationRegister = () => {
    navigate("/cadastro/organizacao");
  };

  if (loading || !user) {
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

  if (user && !user.nomeEmpresa) {
    return (
      <Box sx={{ width: "100%", height: "100%" }}>
        <Grid2
          container
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid2 size={6} padding={2}>
            <Box
              sx={{
                backgroundColor: "#f8d7da",
                color: "#721c24",
                padding: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Você precisa cadastrar sua organização para acessar as
                funcionalidades.
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={handleNavigateToOrganizationRegister}
              >
                Cadastrar Organização
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid2 container width={"92.5%"}>
        <Grid2 size={3} padding={1}>
          <SuggestedConnectionsList />
        </Grid2>
        <Grid2 size={6} padding={1}>
          <FeedbackList />
        </Grid2>
        <Grid2 size={3} padding={1}>
          <ProjectList />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Home;
