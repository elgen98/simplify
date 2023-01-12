import React from "react";
import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Modal from "./Modal";
import PlaylistSelection from "./PlaylistSelection";

const spotify = new SpotifyWebApi();

function EditMode(props) {
  const playlist = props.playlist;
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [open, setOpen] = useState(false);

  function toggleChecked(e) {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTracks([...selectedTracks, value]);
    } else {
      setSelectedTracks(selectedTracks.filter((track) => track !== value));
    }
  }

  function selectReceiver(playlistId) {
    props.moveTracks(playlistId, selectedTracks);
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
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-3 bg-gray-200 rounded-full"
          >
            Move to another playlist
          </button>
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <PlaylistSelection liftId={selectReceiver} />
      </Modal>
      <div className="flex flex-col gap-2 w-3/4">{playlistHtml}</div>
    </>
  );
}

export default EditMode;
