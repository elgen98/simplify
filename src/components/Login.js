import React from "react";
import { loginUrl } from "../spotify";
function Login() {
  return (
    <main className=" flex flex-col justify-center items-center gap-40 h-full">
      <h1 className=" text-5xl text-green-600">Simplify</h1>
      <a
        href={loginUrl}
        className="border rounded-full inline-block w-60 h-14 text-center pt-4 bg-green-600"
      >
        Login with Spotify
      </a>
    </main>
  );
}

export default Login;
