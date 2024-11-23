import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, initializeAuth } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { profile } from "../slices/userSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, user, isCheckingToken, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(reset());
        navigate("/login");
      }, 4000);
    }
  }, [error, dispatch, navigate]);

  useEffect(() => {
    if (user && user.id) {
      dispatch(profile());
    }
  }, [user, dispatch]);
  return { auth, user, isCheckingToken };
};
