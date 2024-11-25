import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { updateOrganization } from "../slices/organizationSlice";

const OrganizationEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { organization, loading } = useSelector((state) => state.organization);

  const [orgData, setOrgData] = useState({
    nome: "",
    logo: "",
    id: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (organization) {
      console.log(organization);
      setOrgData({ nome: organization.nome, id: organization.id });
      setPreviewUrl(organization.logo_url);
    }
  }, [organization]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrgData({ ...orgData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", orgData.nome);
    formData.append("id", orgData.id);
    if (selectedFile) {
      formData.append("logo", selectedFile);
    }

    dispatch(updateOrganization(formData));
    navigate("/organizacao");
  };

  if (loading) {
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          p: 4,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
          Editar Organização
        </Typography>

        <Avatar
          alt={orgData.nome}
          src={previewUrl}
          sx={{ width: 100, height: 100, mb: 3 }}
        />

        <Button variant="contained" component="label" sx={{ mb: 3 }}>
          Escolher Logo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>

        <TextField
          label="Nome da Organização"
          name="nome"
          value={orgData.nome}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Salvar Alterações
        </Button>
      </Box>
    </Container>
  );
};

export default OrganizationEdit;
