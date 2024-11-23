import React, { useEffect, useState } from "react";
import {
  Alert,
  Snackbar,
  Typography,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import SuggestedConnectionsCard from "./SuggestedConnectionsCard";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSuggestedFriendship,
  sendFriendshipRequest,
} from "../../slices/friendshipSlice";
import friendshipService from "../../services/friendshipService";

const SuggestedConnectionsList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { friendships, error } = useSelector((state) => state.friendship);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [sendingRequest, setSendingRequest] = useState(false);

  useEffect(() => {
    console.log("start");
    dispatch(fetchSuggestedFriendship());
  }, [dispatch]);

  const handleSendRequest = async (friendId) => {
    if (user && user.id) {
      setSendingRequest(true);
      dispatch(sendFriendshipRequest({ userId: user.id, friendId }))
        .unwrap()
        .then(() => {
          setNotification({
            open: true,
            message: "Solicitação enviada com sucesso!",
            severity: "success",
          });
        })
        .catch(() => {
          setNotification({
            open: true,
            message: "Erro ao enviar solicitação.",
            severity: "error",
          });
        })
        .finally(() => {
          setSendingRequest(false);
        });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" sx={{ width: "100%", marginBottom: 1 }}>
        <Toolbar sx={{ width: "100%" }}>
          <Typography variant="h6">Sugestões de amizade</Typography>
        </Toolbar>
      </AppBar>
      {friendships.map((usuario, index) => (
        <SuggestedConnectionsCard
          name={usuario.nome}
          key={usuario.id}
          foto_url={usuario.foto_url}
          onSendRequest={() => handleSendRequest(usuario.id)}
          disabled={sendingRequest}
        />
      ))}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SuggestedConnectionsList;
