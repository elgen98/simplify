import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import PlaylistSelection from "./components/PlaylistSelection";
import PlaylistManager from "./components/PlaylistManager";

const spotify = new SpotifyWebApi();

function App() {
    const [token, setToken] = useState("");
    const [playlistId, setPlaylistId] = useState("");

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

    function selectPlaylist(playlistId) {
        setPlaylistId(playlistId);
    }

    let main = (
        <div>
            <h2 className="text-2xl font-semibold ">Your Playlists</h2>
            <PlaylistSelection liftId={selectPlaylist} />
        </div>
    );
    if (playlistId) {
        main = <PlaylistManager id={playlistId} />;
    }

    return (
        <main className="flex flex-col items-center gap-4 w-screen h-screen">
            {token ? main : <Login />}
        </main>
    );
}

export default App;
