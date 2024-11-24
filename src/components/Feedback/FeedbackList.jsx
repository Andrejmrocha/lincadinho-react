import { useEffect, useState } from "react";
import FeedbackCard from "./FeedbackCard";
import { useSelector, useDispatch } from "react-redux";
import feedbackService from "../../services/feedbackService";

import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const users = ["1", "2"];
const FeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const idUsuario = user?.id;
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (idUsuario) {
        const result = await feedbackService.fetchFeedbacks(idUsuario);
        if (result.error) {
          setError(result.error);
        } else {
          setFeedbackList(result.content);
          setPagination({
            pageable: result.pageable,
            totalElements: result.totalElements,
            totalPages: result.totalPages,
            number: result.number,
            size: result.size,
          });
        }
      }
    };

    fetchData();
  }, [idUsuario]);

  return (
    <Box>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar sx={{ width: "100%" }}>
          <Typography variant="h6">Bem-vindo ao seu feed!</Typography>
        </Toolbar>
      </AppBar>

      {/* Condicional para exibir mensagem caso não haja feedbacks */}
      {feedbackList.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: 2 }}>
          Não há feedbacks para exibir. Comece a enviar feedbacks para seus
          colegas!
        </Typography>
      ) : (
        feedbackList.map((feedback, index) => (
          <FeedbackCard
            key={index}
            remetente={feedback.remetente}
            destinatario={feedback.destinatario}
            comentario={feedback.comentario}
            data={feedback.data}
          />
        ))
      )}
    </Box>
  );
};

export default FeedbackList;
