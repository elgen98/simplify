import React, { useEffect, useState } from 'react'
import SpotifyWebApi from "spotify-web-api-js"
import SinglePlaylist from './SinglePlaylist';

const spotify = new SpotifyWebApi();

function PlaylistManager() {

    let testArr = [];
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useState("");

    useEffect(() => {
        //GET playlists owned by user
        let userId = "";
        spotify.getAccessToken();
        spotify.getMe().then(function (data) {
            userId = data.id;
        })

        spotify.getUserPlaylists({ limit: 50 }).then(function (data) {
            testArr = data.items.filter(function (playlist) {
                console.log(playlist);
              return playlist.owner.id === userId;
            });
            setPlaylists(testArr);
          });
    }, [])


 
    const playlistsHtml = playlists.map((playlist) => <li key={playlist.id} onClick={() => {setPlaylistId(playlist.id);}}>{playlist.name}</li>);


  return (
    <div>
        {!playlistId ?            
        <ul>
            {playlistsHtml}
        </ul>
        : <SinglePlaylist id={playlistId}/>}
    </div>
  )
}

export default PlaylistManager