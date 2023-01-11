import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import EditMode from "./EditMode";

const spotify = new SpotifyWebApi();

function PlaylistManager(props) {
  const playlistId = props.id;
  const [showEditMode, setShowEditMode] = useState(false);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);

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

  function handleChange(e) {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTracks([...selectedTracks, value]);
    } else {
      setSelectedTracks(selectedTracks.filter((track) => track !== value));
    }
  }

  function toggleEditMode() {
    setShowEditMode(!showEditMode);
  }

  function handleClick() {
    spotify.removeTracksFromPlaylist(playlistId, selectedTracks);
    let result = playlistTracks.filter(
      (x) => !selectedTracks.includes(x.track.uri)
    );
    setPlaylistTracks(result);
  }

  let playlistHtml = playlistTracks.map((item) => (
    <label key={item.track.id}>
      <input
        type="checkbox"
        name="track"
        value={item.track.uri}
        onChange={handleChange}
      />
      {item.track.name}
    </label>
  ));

  return (
    <main className="flex flex-col justify-center items-center gap-4">
      <div>
        Selected Tracks:{" "}
        {selectedTracks.length ? selectedTracks.join(", ") : null}
        {showEditMode && <EditMode playlist={playlistTracks} />}
        <button onClick={handleClick}>Delete selected</button>
        <button onClick={toggleEditMode}>Simplify</button>
      </div>
      <h2 className="text-2xl font-semibold ">{playlistName}</h2>
      <ul className="flex flex-col gap-2 w-3/4">{playlistHtml}</ul>
    </main>
  );
}

export default PlaylistManager;
