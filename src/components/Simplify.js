import React, { useState } from "react";
import PlaylistManager from "./PlaylistManager";
import PlaylistSelection from "./PlaylistSelection";

function Simplify() {
  const [playlistId, setPlaylistId] = useState("");

  function selectPlaylist(playlistId) {
    setPlaylistId(playlistId);
  }
  return (
    <main className="flex flex-col justify-center items-center gap-4">
      {!playlistId ? (
        <PlaylistSelection liftId={selectPlaylist} />
      ) : (
        <PlaylistManager id={playlistId} />
      )}
    </main>
  );
}

export default Simplify;
