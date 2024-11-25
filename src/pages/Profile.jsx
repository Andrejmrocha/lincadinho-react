import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import UploadIcon from "@mui/icons-material/Upload";

import { useSelector, useDispatch } from "react-redux";
import { profile, resetMessage, updateUserProfile } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import Message from "../components/Util/Message";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [profileData, setProfileData] = useState({
    nome: "",
    sobrenome: "",
    organizacao: "",
    foto: "",
    role: "",
  });

  useEffect(() => {
    if (user.empresa) {
      setProfileData({
        nome: user.nome,
        sobrenome: user.sobrenome,
        organizacao: user.empresa.nome,
        foto: user.foto_url,
        role: user.role,
      });
      setPreviewUrl(user.foto_url);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
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

  const handleEditClick = (event) => {
    event.preventDefault();
    if (isEditing) {
      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("nome", profileData.nome || null);
      formData.append("sobrenome", profileData.sobrenome || null);
      if (selectedFile) {
        formData.append("fotoPerfil", selectedFile);
      }

      dispatch(updateUserProfile(formData));
    }
    setIsEditing(!isEditing);
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

  return (
    <Container maxWidth="sm">
      {success && (
        <Message message="Perfil atualizado com sucesso!" type="success" />
      )}
      {error && <Message message={`Erro: ${error}`} type="error" />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Avatar
          alt={profileData.nome}
          src={previewUrl}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        {isEditing ? (
          <>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadIcon />}
              sx={{ mb: 2 }}
            >
              Escolher Foto
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {selectedFile && (
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {selectedFile.name}
              </Typography>
            )}
            <TextField
              label="Nome"
              name="nome"
              value={profileData.nome}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Sobrenome"
              name="sobrenome"
              value={profileData.sobrenome}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Organização"
              name="organizacao"
              value={profileData.organizacao}
              fullWidth
              margin="normal"
              disabled
            />
          </>
        ) : (
          <>
            <Typography variant="h5" component="h1" gutterBottom>
              {profileData.nome} {profileData.sobrenome}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Organização: {profileData.organizacao}
            </Typography>
          </>
        )}
        <Button
          variant="contained"
          startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
          sx={{ mt: 2 }}
          onClick={handleEditClick}
        >
          {isEditing ? "Salvar" : "Editar Perfil"}
        </Button>
        {user.role === "ADMIN" && (
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate("/organizacao")}
          >
            Gerenciar Organização
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
