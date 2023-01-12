import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function PlaylistSelection(props) {
  const [playlists, setPlaylists] = useState([]);

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
        props.liftId(playlist.id);
      }}
    >
      {playlist.name}
    </li>
  ));

  return (
    <>
      <ul className="flex flex-col gap-2 w-3/4">{playlistGroupHtml}</ul>
    </>
  );
}

export default PlaylistSelection;
