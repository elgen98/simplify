import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Simplify from "./components/Simplify";

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
        <main className="flex flex-col items-center gap-4 w-screen h-screen">
            {token ? <Simplify /> : <Login />}
        </main>
    );
}

export default App;
