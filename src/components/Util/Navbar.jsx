import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";

const StyledNavLinkOrg = styled(NavLink)({
  textDecoration: "none",
  color: "white",
  fontFamily: "Roboto",
  fontSize: "1.5rem",
});

const StyledNavLink = styled(NavLink)({
  textDecoration: "none",
  color: "white",
  fontFamily: "Roboto",
  fontSize: "1rem",
});

const pagesNotAuth = [
  { description: "Login", link: "/login" },
  { description: "Registro", link: "/registro" },
];

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.user);
  const organization = user ? user.empresa : "";
  // const { organization } = useSelector((state) => state.organization);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkDetails =
    organization === null
      ? { description: "Cadastrar organização", link: "/cadastro/organizacao" }
      : { description: "Enviar Feedback", link: "/enviar-feedback" };

  const pagesAuth = [
    { description: "Página Inicial", link: "/" },
    { description: "Minhas conexões", link: "/minhas-conexoes" },
    linkDetails,
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#05111b",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Toolbar disableGutters sx={{ width: "91%" }}>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Lincadinho
          </Typography>
        </Box>
        {auth && (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StyledNavLinkOrg to={"/organizacao"}>
              {organization && organization.nome}
            </StyledNavLinkOrg>
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {auth ? (
            <>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  justifyContent: "flex-end",
                }}
                key={0}
              >
                {pagesAuth.map((page, index) => (
                  <StyledNavLink to={page.link} key={index}>
                    <Button
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        fontSize: "12px",
                      }}
                    >
                      {page.description}
                    </Button>
                  </StyledNavLink>
                ))}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StyledNavLink to={"/meu-perfil"}>
                  <Tooltip title="Meu perfil">
                    <IconButton sx={{ p: 0 }}>
                      <Avatar
                        alt={user?.nome || "Usuário"}
                        src={user?.foto_url || ""}
                      />
                    </IconButton>
                  </Tooltip>
                </StyledNavLink>
                <Tooltip title="Logout">
                  <IconButton onClick={handleLogout} sx={{ p: 0, ml: 2 }}>
                    <LogoutIcon sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              {pagesNotAuth.map((page, index) => (
                <StyledNavLink to={page.link} key={index}>
                  <Button
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontSize: "12px",
                      textDecoration: "none",
                    }}
                  >
                    {page.description}
                  </Button>
                </StyledNavLink>
              ))}
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
