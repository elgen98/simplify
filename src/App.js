import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import PlaylistSelection from "./components/PlaylistSelection";

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    //GET token from url and resetting hash
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);
    }
  }, []);

  return (
    <div className=" h-screen">{token ? <PlaylistSelection /> : <Login />}</div>
  );
}

export default App;
