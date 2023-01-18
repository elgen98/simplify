import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import LoadingIcons from "react-loading-icons";
import { GrClose, GrAdd } from "react-icons/gr";

const spotify = new SpotifyWebApi();

function PlaylistSelection(props) {
    const [playlists, setPlaylists] = useState([]);
    const [userId, setUserId] = useState("");
    const [show, setShow] = useState(false);
    const [playlistName, setPlaylistName] = useState("");

    //Get the list of playlists owned by this user
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
    }, [userId]);

    //Create a new playlist
    function createNewPlaylist() {
        spotify
            .createPlaylist(userId, { name: playlistName })
            .then((data) => {
                setPlaylists([...playlists, data]);
                setPlaylistName("");
                props.liftId(data.id);
            })
            .catch((err) => console.error(err));

        setShow(false);
    }

    //Handle user input for name of new playlist
    function handleNameInput(value) {
        setPlaylistName(value);
    }
    // HTML //
    let playlistGroupHtml = playlists.map((playlist) => (
        <li
            className="cursor-pointer"
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
            className="rounded-full w-32 bg-gray-600 text-nice-yellow"
            onClick={() => {
                setShow(true);
            }}
        >
            New Playlist
        </button>
    );

    if (show) {
        createBtn = (
            <form
                className="flex gap-2"
                onSubmit={() => {
                    createNewPlaylist();
                    props.closeModal();
                }}
            >
                <button
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    <GrClose />
                </button>
                <label>
                    <input
                        className="rounded-full bg-gray-600 text-nice-yellow px-2"
                        type="text"
                        value={playlistName}
                        onChange={(e) => {
                            handleNameInput(e.target.value);
                        }}
                        required
                    />
                </label>
                <button type="submit">
                    <GrAdd />
                </button>
            </form>
        );
    }

    return (
        <>
            {playlists.length > 0 ? (
                <>
                    <ul className="w-3/4 flex flex-col items-start gap-2 drop-shadow-blueText">
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
