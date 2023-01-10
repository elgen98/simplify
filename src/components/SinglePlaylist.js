import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function SinglePlaylist(props) {
  const playlistId = props.id;
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    let testArray = [];
    let offset = 0;
    let playlistTotal = 0;

    spotify.getPlaylist(playlistId).then(function (playlist) {
      console.log(playlist);
      console.log(playlist.tracks.total);
      playlistTotal = playlist.tracks.total;
      setPlaylistName(playlist.name);
    });

    console.log("total", playlistTotal);

    /* while(testArray.length < playlistTotal){
        spotify.getPlaylistTracks({offset: offset}).then(function (tracks){
            testArray.push(tracks.items)
          })
          offset += 100;
          console.log("hey");
    } */
  }, []);

  let playlistHtml = playlistTracks.map((item) => (
    <li key={item.track.id}>
      <h3>{item.track.name}</h3>
    </li>
  ));

  return (
    <main className="flex flex-col justify-center items-center gap-4">
      <button
        onClick={() => {
          console.log("JSON OBJECT", playlistTracks);
        }}
      >
        GET JSON
      </button>
      <h2 className="text-2xl font-semibold ">{playlistName}</h2>
      <ul className="flex flex-col gap-2 w-3/4">{playlistHtml}</ul>
    </main>
  );
}

export default SinglePlaylist;
