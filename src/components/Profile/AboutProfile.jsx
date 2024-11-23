import { Box, Typography, Grid2, TextField } from "@mui/material";

import AboutProfileItem from "./AboutProfileItem";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { profile, resetMessage } from "../../slices/userSlice";

const AboutProfile = ({ user }) => {
  const { nome, sobrenome, nomeEmpresa } = user || {};

  // const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [organization, setOrganization] = useState("");
  // useEffect(() => {
  //   dispatch(profile());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     setName(user.nome);
  //     setLastName(user.sobrenome);
  //     setOrganization(user.nomeEmpresa);
  //   }
  // }, [user]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography fontSize={"1.1rem"} marginTop={"4rem"}>
          Sobre
        </Typography>
        <Box marginTop={"2rem"}>
          <Box sx={{ width: "70%", height: "40px" }}>
            <Grid2
              container
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid2 xs={6}>
                <Typography
                  sx={{
                    justifyContent: "space-between",
                    height: "1.4375em",
                    lineHeight: "1.4375em",
                  }}
                >
                  Nome
                </Typography>
              </Grid2>
              <Grid2 xs={6}>
                <TextField value={nome} fullWidth />
              </Grid2>
            </Grid2>
            <Grid2
              container
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <Grid2 xs={6}>
                <Typography sx={{ height: "1.4375em", lineHeight: "1.4375em" }}>
                  Sobrenome
                </Typography>
              </Grid2>
              <Grid2 xs={6}>
                <TextField value={sobrenome} fullWidth />
              </Grid2>
            </Grid2>
            <Grid2
              container
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <Grid2 xs={6}>
                <Typography sx={{ height: "1.4375em", lineHeight: "1.4375em" }}>
                  Organização
                </Typography>
              </Grid2>
              <Grid2 xs={6}>
                <TextField value={nomeEmpresa} fullWidth />
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AboutProfile;
