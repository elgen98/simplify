import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function SinglePlaylist(props) {
  const playlistId = props.id;
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    spotify
      .getPlaylist(playlistId)
      .then(function (playlist) {
        setPlaylistName(playlist.name);
        return playlist.tracks.total;
      })
      .then(function (totalTracks) {
        fetchLoop(totalTracks);
      });

    function fetchLoop(totalTracks) {
      let offset = 0;
      let requestSize = 100;
      let testArray = [];
      let loopAmount = Math.ceil(totalTracks / requestSize);
      console.log(loopAmount);
      for (let i = 0; i < loopAmount; i++) {
        spotify
          .getPlaylistTracks(playlistId, { offset: offset, limit: requestSize })
          .then(function (data) {
            /* setPlaylistTracks([...playlistTracks, data.items]); */
            testArray = testArray.concat(data.items);
            console.log("tracks", testArray);
            setPlaylistTracks(...playlistTracks, testArray);
            console.log("state", playlistTracks);
          });
        offset += 100;
      }
    }
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
      <p>{playlistTracks.length}</p>
      <ul className="flex flex-col gap-2 w-3/4">{playlistHtml}</ul>
    </main>
  );
}

export default SinglePlaylist;
