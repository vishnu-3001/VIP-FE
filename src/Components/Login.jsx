import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Store/AuthContext";

export default function Login() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleGooglelogin() {
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}api/v1/auth`);
      const data = await response.json();
      if (data.auth_url) {
        window.location.href = data.auth_url;
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const token = urlParams.get("token");
    const email=urlParams.get("email")
    const refreshToken = urlParams.get("refresh_token");
    if (token) {
      authContext.login(token); 
      sessionStorage.setItem("token", token); 
      sessionStorage.setItem("email",email);
      sessionStorage.setItem("refresh_token", refreshToken);
      navigate("/DocumentFetch", { replace: true }); 
    }
  }, []);

  return (
    <div>
      <button onClick={handleGooglelogin}>Sign in</button>
    </div>
  );
}
