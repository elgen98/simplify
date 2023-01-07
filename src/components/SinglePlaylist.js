import React, {useEffect, useState} from 'react'
import SpotifyWebApi from 'spotify-web-api-js'

const spotify = new SpotifyWebApi();

function SinglePlaylist(props) {

  const playlistId = props.id
  const [playlist, setPlaylist] = useState({});

  useEffect(() => {
    spotify.getPlaylist(playlistId).then((data) => {
        setPlaylist(data)
    })
  },[])

  
  return (
    <div><button onClick={() => {console.log(playlist)}}>Klick</button></div>
  )
}

export default SinglePlaylist