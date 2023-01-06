import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function App() {
  let testArr = [];
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);
    }

    spotify.getUserPlaylists({ limit: 50 }).then(function (data) {
      testArr = data.items.filter(function (playlist) {
        return playlist.owner.id === "elgen98";
      });
      setPlaylists(testArr);
      console.log(playlists);
    });
  }, []);

  return <div className="app">{token ? <h1>Logged in</h1> : <Login />}</div>;
}

export default App;
