import React, { useState } from "react";
import PlaylistManager from "./PlaylistManager";
import PlaylistSelection from "./PlaylistSelection";

function Simplify() {
    const [playlistId, setPlaylistId] = useState("");

    function selectPlaylist(playlistId) {
        setPlaylistId(playlistId);
    }
    return (
        <main className="flex flex-col justify-center items-center gap-4 w-screen">
            {!playlistId ? (
                <div>
                    <h2 className="text-2xl font-semibold ">Your Playlists</h2>
                    <PlaylistSelection liftId={selectPlaylist} />
                </div>
            ) : (
                <PlaylistManager id={playlistId} />
            )}
        </main>
    );
}

export default Simplify;
