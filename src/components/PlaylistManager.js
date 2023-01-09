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
              return playlist.owner.id === userId;
            });
            setPlaylists(testArr);
          });
    }, [])

    let playlistGroupHtml = playlists.map((playlist) => 
    <li key={playlist.id} onClick={() => {setPlaylistId(playlist.id);}}>{playlist.name}</li>
    );

  return (
    <main className="h-full" >
        {!playlistId ?
        <section className="flex flex-col justify-center items-center gap-4">   
          <h2 className="text-2xl font-semibold ">Your Playlists</h2>            
          <ul className="flex flex-col gap-2 w-3/4">
              {playlistGroupHtml}
          </ul>
        </section>
        : <SinglePlaylist id={playlistId}/>}
    </main>
  )
}

export default PlaylistManager