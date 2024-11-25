import OrganizationForm from "../components/OrganizationForm";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
const OrganizationRegister = () => {
  const { loading, error, auth } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log("Auth state in Organization:", auth);
  }, [auth]);

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <OrganizationForm></OrganizationForm>
    </div>
  );
};

export default OrganizationRegister;
