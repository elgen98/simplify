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
            <button
                onClick={() => {
                    window.location.reload();
                }}
            >
                Log out
            </button>
            {playlistId ? (
                <PlaylistManager id={playlistId} liftId={selectPlaylist} />
            ) : (
                <div>
                    <h2 className="text-2xl font-semibold ">Your Playlists</h2>
                    <PlaylistSelection liftId={selectPlaylist} />
                </div>
            )}
        </>
    );
}

export default Simplify;
