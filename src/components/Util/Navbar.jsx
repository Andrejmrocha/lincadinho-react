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

import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";

const pagesNotAuth = [
  { description: "Login", link: "/login" },
  { description: "Registro", link: "/registro" },
];

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.user);
  const organization = user ? user.organization : "";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkDetails =
    organization === ""
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
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Typography variant="h6" sx={{ color: "white" }}>
              Texto Centralizado
            </Typography> */}
        </Box>
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
                  <NavLink to={page.link} key={index}>
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
                  </NavLink>
                ))}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <NavLink to={"/meu-perfil"}>
                  <Tooltip title="Meu perfil">
                    <IconButton sx={{ p: 0 }}>
                      <Avatar
                        alt={user?.nome || "Usuário"}
                        src={user?.foto_url || ""}
                      />
                    </IconButton>
                  </Tooltip>
                </NavLink>
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
                <NavLink to={page.link} key={index}>
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
                </NavLink>
              ))}
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
