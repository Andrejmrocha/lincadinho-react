import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Toolbar,
  Typography,
  Grid2,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Box,
  Divider,
  Autocomplete,
} from "@mui/material";
import {
  resetMessage,
  reviewText,
  submitFeedback,
} from "../slices/feedbackSlice";
import Message from "../components/Util/Message";
import { fetchUsers } from "../slices/userSlice";

const Feedback = () => {
  const [originalText, setOriginalText] = useState("");
  const [usuarioDestino, setUsuarioDestino] = useState("");
  const [assunto, setAssunto] = useState("");
  const users = useSelector((state) => state.user.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const userId = useSelector((state) => state.auth.user);
  const [suggestedText, setSuggestedText] = useState(null);
  const { submitLoading, reviewLoading, message, error, success } = useSelector(
    (state) => state.feedback
  );

  const dispatch = useDispatch();

  const handleReviewText = () => {
    setTimeout(() => {
      setSuggestedText("Exemplo de texto revisado...");
      // dispatch(reviewText({ text: originalText }));
    }, 2000);
  };

  const handleSubmitFeedback = (event) => {
    event.preventDefault();

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

  useEffect(() => {
    if (userId) {
      dispatch(fetchUsers());
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (success) {
      dispatch(resetMessage());
    }
  }, [success, dispatch]);

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Enviar Feedback</Typography>
        </Toolbar>
      </AppBar>

      <Grid2 container spacing={3} sx={{ marginTop: 2 }}>
        <Grid2 item size={7}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Detalhes do Feedback
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"} fullWidth>
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
                  />
                )}
                sx={{ width: "50%" }}
              />
              <TextField
                label="Assunto"
                variant="outlined"
                required
                sx={{ width: "49%" }}
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
              />
            </Box>
            <TextField
              label="Texto do Feedback"
              fullWidth
              multiline
              minRows={5}
              variant="outlined"
              margin="normal"
              required
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
            />

            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleReviewText}
                disabled={reviewLoading}
              >
                {reviewLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Revisar Texto"
                )}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleSubmitFeedback}
                sx={{ marginTop: 1 }}
              >
                Enviar
              </Button>
            </Box>
          </Paper>
        </Grid2>

        <Grid2 item size={5}>
          <Paper
            elevation={3}
            sx={{ padding: 3, maxHeight: "500px", overflowY: "auto" }}
          >
            <Typography variant="h6" gutterBottom>
              Sugestões de Revisão
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            {suggestedText ? (
              <>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Texto Original:
                </Typography>
                <Typography
                  variant="body2"
                  paragraph
                  sx={{ wordBreak: "break-word" }}
                >
                  {originalText}
                </Typography>

                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Texto Revisado:
                </Typography>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  paragraph
                  sx={{ wordBreak: "break-word" }}
                >
                  {suggestedText}
                </Typography>

                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOriginalText(suggestedText)}
                  >
                    Aplicar Sugestões
                  </Button>
                </Box>
              </>
            ) : (
              <Typography variant="body2" color="textSecondary">
                As sugestões aparecerão aqui após clicar em "Revisar Texto".
              </Typography>
            )}
          </Paper>
        </Grid2>
      </Grid2>
      {success && <Message message="Feedback enviado." type="success" />}
    </Box>
  );
};

export default Feedback;
