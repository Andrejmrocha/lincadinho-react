import { Box, Button, Grid2, Typography } from "@mui/material";
import React from "react";

const NameProfile = ({ user }) => {
  const { nome, sobrenome } = user || {};
  return (
    <>
      <Box
        sx={{
          width: "70%",
          color: "#000",
          paddingTop: 3,
        }}
      >
        <Grid2 container>
          <Grid2 size={9}>
            <Typography fontSize={"1.25rem"} marginBottom={"0.5rem"}>
              {nome + " " + sobrenome}
            </Typography>
            <Typography fontSize={"1.1rem"} color="#0062cc">
              Web Developer
            </Typography>
          </Grid2>
          <Grid2 size={3}>
            <Button
              sx={{ padding: ".8rem", borderRadius: "10px" }}
              type="submit"
              variant="contained"
            >
              Editar perfil
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default NameProfile;
