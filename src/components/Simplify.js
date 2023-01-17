import React, { useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import PlaylistManager from "./PlaylistManager";
import PlaylistSelection from "./PlaylistSelection";

const spotify = new SpotifyWebApi();
function Simplify() {
    const [playlistId, setPlaylistId] = useState("");

    function selectPlaylist(playlistId) {
        setPlaylistId(playlistId);
    }
    return (
        <>
            <header className=" w-full flex justify-between items-center p-2 md:w-3/4 xl:w-2/4 2xl:w-2/5">
                <h1 className="text-xl font-bold text-nice-yellow font-outline-05">
                    Simplify
                </h1>
                <nav>
                    <button
                        className=" py-2 w-20 bg-gray-600 rounded-full text-nice-yellow font-semibold"
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        Log out
                    </button>
                </nav>
            </header>
            {playlistId ? (
                <PlaylistManager id={playlistId} liftId={selectPlaylist} />
            ) : (
                <div className=" w-full flex flex-col items-center gap-4 md:w-3/4 xl:w-2/4 2xl:w-2/5">
                    <h2 className="text-2xl font-semibold text-nice-yellow font-outline-05 ">
                        Your Playlists
                    </h2>
                    <PlaylistSelection liftId={selectPlaylist} />
                </div>
            )}
        </>
    );
}

export default Simplify;
