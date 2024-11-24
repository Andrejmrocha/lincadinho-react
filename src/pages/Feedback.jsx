import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Box,
  Divider,
  Autocomplete,
} from "@mui/material";
import {
  resetFeedbackState,
  resetMessage,
  reviewText,
  submitFeedback,
} from "../slices/feedbackSlice";
import Message from "../components/Util/Message";
import { fetchUsers } from "../slices/userSlice";

const Feedback = () => {
  const [originalText, setOriginalText] = useState("");
  const [assunto, setAssunto] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);
  const userId = useSelector((state) => state.auth.user);
  const {
    suggestedText,
    submitLoading,
    reviewLoading,
    message,
    error,
    success,
  } = useSelector((state) => state.feedback);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUsers());
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetFeedbackState());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const handleReviewText = () => {
    if (!originalText.trim()) return;
    dispatch(reviewText(originalText));
  };

  const handleSubmitFeedback = (event) => {
    event.preventDefault();
    if (!selectedUser || !assunto || !originalText) return; // Validação básica
    dispatch(
      submitFeedback({
        idUsuarioDestinatario: selectedUser.id,
        data: new Date().toISOString().slice(0, 10),
        comentario: originalText,
        assunto: assunto,
      })
    );
  };

  const handleUserChange = (event, newValue) => {
    setSelectedUser(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Enviar Feedback</Typography>
        </Toolbar>
      </AppBar>

      <Box display="flex" gap={2} mt={2}>
        <Paper elevation={3} sx={{ padding: 3, flex: 7 }}>
          <Typography variant="h6" gutterBottom>
            Detalhes do Feedback
          </Typography>
          <Autocomplete
            options={users}
            getOptionLabel={(option) => option.nome}
            onChange={handleUserChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Usuário Destino"
                variant="outlined"
                onChange={(e) => dispatch(fetchUsers(e.target.value))}
                disabled={submitLoading || reviewLoading}
                helperText={
                  users.length === 0 ? "Nenhum usuário encontrado." : undefined
                }
              />
            )}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Assunto"
            variant="outlined"
            fullWidth
            required
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            disabled={submitLoading}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Texto do Feedback"
            fullWidth
            multiline
            minRows={5}
            variant="outlined"
            required
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            disabled={submitLoading || reviewLoading}
            sx={{ mb: 2 }}
          />
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleReviewText}
              disabled={reviewLoading || !originalText.trim()}
            >
              {reviewLoading ? <CircularProgress size={24} /> : "Revisar Texto"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleSubmitFeedback}
              disabled={submitLoading || !selectedUser || !assunto.trim()}
            >
              {submitLoading ? <CircularProgress size={24} /> : "Enviar"}
            </Button>
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{ padding: 3, flex: 5, maxHeight: "500px", overflowY: "auto" }}
        >
          <Typography variant="h6" gutterBottom>
            Sugestões de Revisão
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {reviewLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          ) : suggestedText ? (
            <>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Texto Original:
              </Typography>
              <Typography variant="body1" paragraph>
                {originalText}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Texto Revisado:
              </Typography>
              <Typography variant="body1" paragraph>
                {suggestedText}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOriginalText(suggestedText)}
              >
                Aplicar Sugestões
              </Button>
            </>
          ) : (
            <Typography variant="body2" color="textSecondary">
              As sugestões aparecerão aqui após clicar em "Revisar Texto".
            </Typography>
          )}
        </Paper>
      </Box>

      {message && (
        <Message
          message={message}
          type={success ? "success" : error ? "error" : "info"}
        />
      )}
    </Box>
  );
};

export default Feedback;
