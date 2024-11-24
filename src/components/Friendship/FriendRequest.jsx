import Message from "../Util/Message";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FriendRequestCard from "./FriendRequestCard";
import {
  fetchFriendshipRequests,
  acceptFriendshipRequest,
  refuseFriendshipRequest,
} from "../../slices/friendshipSlice";

const FriendRequest = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { requests, error, loading } = useSelector((state) => state.friendship);
  console.log("requests: ", requests);
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchFriendshipRequests(user.id));
    }
  }, [user, dispatch]);

  const handleAccept = async (id) => {
    await dispatch(acceptFriendshipRequest(id));
    dispatch(fetchFriendshipRequests(user.id));
  };

  const handleDecline = async (id) => {
    await dispatch(refuseFriendshipRequest(id));
    dispatch(fetchFriendshipRequests(user.id));
  };

  const handleClose = () => {}; // logica para fechar mensagem de erro };

  return (
    <div>
      {error && (
        <Message
          open={true}
          message={error}
          type="error"
          handleClose={handleClose}
        />
      )}
      {requests.map((request) => (
        <FriendRequestCard
          key={request.id}
          name={request.remetente.nome}
          photo={request.remetente.foto_url}
          createdAt={request.dataCricao}
          onAccept={() => handleAccept(request.id)}
          onDecline={() => handleDecline(request.id)}
        />
      ))}
    </div>
  );
};

export default FriendRequest;
