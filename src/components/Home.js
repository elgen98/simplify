import React, { useState, useEffect } from "react";
import Login from "./Login";
import { getTokenFromUrl } from "../spotify";
import SpotifyWebApi from "spotify-web-api-js";
import PlaylistManager from "./PlaylistManager";
import { Outlet } from "react-router-dom";

const spotify = new SpotifyWebApi();

function Home() {
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
        <main className="flex flex-col items-center gap-4 w-screen h-screen">
            {token ? <PlaylistManager /> : <Login />}
        </main>
    );
}

export default Home;
