import React from "react";
import { loginUrl } from "../spotify";
function Login() {
  return (
    <div>
      <a href={loginUrl}>Login to Spotify</a>
    </div>
  );
}

export default Login;
