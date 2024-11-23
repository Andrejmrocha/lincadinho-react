import { Alert } from "@mui/material";

const Message = ({ message, type }) => {
  return (
    <>
      <Alert severity={type}>{message}</Alert>
    </>
  );
};

export default Message;
