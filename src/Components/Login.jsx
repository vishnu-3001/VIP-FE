import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Store/AuthContext";

export default function Login() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleGooglelogin() {
    try {
      console.log(process.env.REACT_APP_LOCAL_BE_URL)
      const response = await fetch(`${process.env.REACT_APP_BE_URL}api/v1/auth`);
      const data = await response.json();
      if (data.auth_url) {
        window.location.href = data.auth_url;
      }
    } catch (error) {
      console.error("Failed to initiate OAuth", error);
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      authContext.login(token); // Update auth context
      sessionStorage.setItem("token", token); // Store token securely
      navigate("/DocumentFetch", { replace: true }); // Redirect to DocumentFetch
    }
  }, []);

  return (
    <div>
      <button onClick={handleGooglelogin}>Sign in</button>
    </div>
  );
}
