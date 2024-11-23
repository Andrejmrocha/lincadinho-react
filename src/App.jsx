import { useDispatch, useSelector } from "react-redux";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useAuth } from "./hooks/useAuth";

import Login from "./pages/login";
import Home from "./pages/Home";
import Organization from "./pages/Organization";

import Message from "./components/Util/Message";

import "./App.css";
import Navbar from "./components/Util/Navbar";
import Register from "./pages/Register";

import LoadingIndicator from "./components/Util/LoadingIndicator";
import Profile from "./pages/Profile";
import { useEffect } from "react";

import authService from "./services/authService";
import { login } from "./slices/authSlice";
import Feedback from "./pages/Feedback";
import Friendship from "./pages/Friendship";

function App() {
  const { auth, loading, user, isChecking } = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const initializeAuth = async () => {
      const tokenStatus = await authService.verifyToken();
      if (!tokenStatus.valid) {
        await authService.logout();
        navigate("/login");
      } else {
        dispatch(login.fulfilled(tokenStatus));
        startTokenMonitor();
      }
    };

    if (location.pathname !== "/registro" && location.pathname !== "/login") {
      initializeAuth();
    }
  }, [dispatch, navigate, location.pathname]);

  const startTokenMonitor = () => {
    const checkTokenInterval = 2 * 60 * 1000; // Intervalo de 4 minutos

    setInterval(async () => {
      const token = localStorage.getItem("token");
      if (authService.isTokenExpiringSoon(token)) {
        try {
          const newToken = await authService.renewToken();
          if (newToken) {
            dispatch(login.fulfilled({ token: newToken }));
          }
        } catch (error) {
          console.error("Erro ao renovar o token", error);
          await authService.logout();
          navigate("/login");
        }
      }
    }, checkTokenInterval);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      {loading || isChecking ? (
        <LoadingIndicator />
      ) : (
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/registro"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/cadastro/organizacao"
              element={auth ? <Organization /> : <Navigate to="/" />}
            />
            <Route path="/meu-perfil" element={<Profile />} />
            <Route path="/enviar-feedback" element={<Feedback />} />
            <Route path="/minhas-conexoes" element={<Friendship />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
