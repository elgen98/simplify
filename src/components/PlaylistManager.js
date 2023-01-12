import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import EditMode from "./EditMode";

const spotify = new SpotifyWebApi();

function PlaylistManager(props) {
  const playlistId = props.id;
  const [showEditMode, setShowEditMode] = useState(false);
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
      for (let i = 0; i < loopAmount; i++) {
        spotify
          .getPlaylistTracks(playlistId, { offset: offset, limit: requestSize })
          .then(function (data) {
            testArray = testArray.concat(data.items);
            setPlaylistTracks(...playlistTracks, testArray);
          });
        offset += requestSize;
      }
    }
  }, []);

  function toggleEditMode() {
    setShowEditMode(!showEditMode);
  }

  function deleteTracks(selectedTracks) {
    spotify.removeTracksFromPlaylist(playlistId, selectedTracks);
    let result = playlistTracks.filter(
      (x) => !selectedTracks.includes(x.track.uri)
    );
    setPlaylistTracks(result);
  }

  function transferTracks(id, selectedTracks) {
    spotify.addTracksToPlaylist(id, selectedTracks);
    deleteTracks(selectedTracks);
  }

  let playlistHtml = playlistTracks.map((item) => (
    <li key={item.track.id}>{item.track.name}</li>
  ));

  return (
    <main className="flex flex-col justify-center items-center gap-4">
      <h2 className="text-2xl font-semibold ">{playlistName}</h2>
      <button onClick={toggleEditMode}>Simplify</button>
      {showEditMode ? (
        <EditMode
          playlist={playlistTracks}
          removeTracks={deleteTracks}
          moveTracks={transferTracks}
        />
      ) : (
        <ul className="flex flex-col gap-2 w-3/4">{playlistHtml}</ul>
      )}
    </main>
  );
}

export default PlaylistManager;
