import React from "react";
import { useState } from "react";

function EditMode(props) {
  const playlist = props.playlist;
  const [selectedTracks, setSelectedTracks] = useState([]);

  function handleChange(e) {
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
        onChange={handleChange}
      />
      {item.track.name}
    </label>
  ));

  return (
    <div>
      <button onClick={() => props.foo(selectedTracks)}>Delete</button>
      <div className="flex flex-col gap-2 w-3/4">{playlistHtml}</div>
    </div>
  );
}

export default EditMode;
