import React, { useState } from "react";
import PlaylistManager from "./PlaylistManager";
import PlaylistSelection from "./PlaylistSelection";

function Simplify() {
    const [playlistId, setPlaylistId] = useState("");

    function selectPlaylist(playlistId) {
        setPlaylistId(playlistId);
    }
    return (
        <>
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
