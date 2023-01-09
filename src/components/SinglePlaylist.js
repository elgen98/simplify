import React, {useEffect, useState} from 'react'
import SpotifyWebApi from 'spotify-web-api-js'

const spotify = new SpotifyWebApi();

function SinglePlaylist(props) {

  const playlistId = props.id
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("")

  useEffect(() => {
    spotify.getPlaylist(playlistId).then(function (data) {
        setPlaylistTracks(data.tracks.items);
        setPlaylistName(data.name);
    });
  }, [])

  let playlistHtml = playlistTracks.map((item) => 
  <li key={item.track.id}>
     <h3>{item.track.name}</h3>
  </li>
 );
 
  return (
    <main className="flex flex-col justify-center items-center gap-4">
      <button onClick={() => {console.log("JSON OBJECT", playlistTracks)}}>GET JSON</button>
      <h2 className="text-2xl font-semibold ">{playlistName}</h2>
      <ul className="flex flex-col gap-2 w-3/4">
        {playlistHtml}
      </ul>
    </main>
  )
}

export default SinglePlaylist