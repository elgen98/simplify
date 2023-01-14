import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function PlaylistSelection(props) {
    const [playlists, setPlaylists] = useState([]);
    const [userId, setUserId] = useState("");
    const [show, setShow] = useState(false);
    const [playlistName, setPlaylistName] = useState("");

    //Get the list of playlists owned by this user // Could be improved by using context and
    useEffect(() => {
        Promise.all([spotify.getMe(), spotify.getUserPlaylists({ limit: 50 })])
            .then((values) => {
                setUserId(values[0].id);
                setPlaylists(
                    values[1].items.filter(function (item) {
                        return item.owner.id === userId;
                    })
                );
            })
            .catch((err) => console.error(err));
        //loops 1 extra time because state. But need it for create new playlist //Fix?
        console.log("hey");
    }, [userId]);

    function createNewPlaylist() {
        spotify.createPlaylist(userId, { name: playlistName }).then((data) => {
            setPlaylists([...playlists, data]);
            setPlaylistName("");
            props.liftId(data.id);
        });

        setShow(false);
    }

    function handleChange(e) {
        setPlaylistName(e.target.value);
    }

    let playlistGroupHtml = playlists.map((playlist) => (
        <li
            key={playlist.id}
            onClick={() => {
                props.liftId(playlist.id);
                props.closeModal();
            }}
        >
            {playlist.name}
        </li>
    ));

    return (
        <>
            <ul className="flex flex-col gap-2 w-3/4">{playlistGroupHtml}</ul>
            {!show ? (
                <button
                    onClick={() => {
                        setShow(true);
                    }}
                >
                    Create new Playlist
                </button>
            ) : (
                <div>
                    <button
                        onClick={() => {
                            setShow(false);
                        }}
                    >
                        Close
                    </button>
                    <label>
                        <input
                            type="text"
                            value={playlistName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button
                        onClick={() => {
                            createNewPlaylist();
                            props.closeModal();
                        }}
                    >
                        Add
                    </button>
                </div>
            )}
        </>
    );
}

export default PlaylistSelection;
