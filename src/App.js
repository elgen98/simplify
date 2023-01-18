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
    //If token exists then gain access to application, otherwise redirect to login page
    return (
        <>
            {token ? (
                <div className="flex flex-col items-center w-screen min-h-screen bg-nice-gray">
                    <Simplify />
                </div>
            ) : (
                <Login />
            )}
        </>
    );
}

export default App;
