import React, {useEffect, useState} from 'react'
import SpotifyWebApi from 'spotify-web-api-js'

const spotify = new SpotifyWebApi();

function SinglePlaylist(props) {

  const playlistId = props.id
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    spotify.getPlaylistTracks(playlistId).then(function (data) {
        setPlaylistTracks(data.items);
    });
  }, [])

  let playlistHtml = playlistTracks.map((item) => 
  <li key={item.track.id}>
     <h3>{item.track.name}</h3>
  </li>
 );
 
  return (
    <div>
      <button onClick={() => {console.log("JSON OBJECT", playlistTracks)}}>GET JSON</button>
      <ul>
        {playlistHtml}
      </ul>
    </div>
  )
}

export default SinglePlaylist