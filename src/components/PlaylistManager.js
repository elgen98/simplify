import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import SinglePlaylist from "./SinglePlaylist";

const spotify = new SpotifyWebApi();

function PlaylistManager() {
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useState("");

  useEffect(() => {
    Promise.all([spotify.getMe(), spotify.getUserPlaylists({ limit: 50 })])
      .then((values) => {
        let userId = values[0].id;
        setPlaylists(
          values[1].items.filter(function (item) {
            return item.owner.id === userId;
          })
        );
      })
      .catch((err) => console.error(err));
  }, []);

  let playlistGroupHtml = playlists.map((playlist) => (
    <li
      key={playlist.id}
      onClick={() => {
        setPlaylistId(playlist.id);
      }}
    >
      {playlist.name}
    </li>
  ));

  return (
    <>
      {!playlistId ? (
        <main className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl font-semibold ">Your Playlists</h2>
          <ul className="flex flex-col gap-2 w-3/4">{playlistGroupHtml}</ul>
        </main>
      ) : (
        <SinglePlaylist id={playlistId} />
      )}
    </>
  );
}

export default PlaylistManager;
