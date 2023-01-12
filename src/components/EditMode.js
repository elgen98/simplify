import React from "react";
import { useState } from "react";

function EditMode(props) {
  const playlist = props.playlist;
  const [selectedTracks, setSelectedTracks] = useState([]);

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
        </div>
      )}
      <div className="flex flex-col gap-2 w-3/4">{playlistHtml}</div>
    </>
  );
}

export default EditMode;
