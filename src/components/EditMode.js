import React from "react";
import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function EditMode(props) {
  const playlist = props.playlist;
  const [selectedTracks, setSelectedTracks] = useState([]);
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

  function toggleChecked(e) {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTracks([...selectedTracks, value]);
    } else {
      setSelectedTracks(selectedTracks.filter((track) => track !== value));
    }
  }

  let playlistHtml = playlist.map((item) => (
    <label key={item.track.id}>
      <input
        type="checkbox"
        name="track"
        value={item.track.uri}
        onChange={toggleChecked}
      />
      {item.track.name}
    </label>
  ));

  return (
    <>
      {selectedTracks.length > 0 && (
        <div>
          <button onClick={() => props.removeTracks(selectedTracks)}>
            Delete
          </button>
          <buttton>Move to another playlist</buttton>
        </div>
      )}
      <div className="flex flex-col gap-2 w-3/4">{playlistHtml}</div>
    </>
  );
}

export default EditMode;
