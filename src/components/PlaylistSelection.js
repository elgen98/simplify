import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import LoadingIcons from "react-loading-icons";

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

    function handleNameInput(value) {
        setPlaylistName(value);
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

    let createBtn = (
        <button
            onClick={() => {
                setShow(true);
            }}
        >
            Create new Playlist
        </button>
    );

    if (show) {
        createBtn = (
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
                        onChange={(e) => {
                            handleNameInput(e.target.value);
                        }}
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
        );
    }

    return (
        <>
            {playlists.length > 0 ? (
                <>
                    <ul className="w-3/4 flex flex-col items-start gap-2">
                        {playlistGroupHtml}
                    </ul>
                    {createBtn}
                </>
            ) : (
                <LoadingIcons.Circles fill="#F2B705" />
            )}
        </>
    );
}

export default PlaylistSelection;
