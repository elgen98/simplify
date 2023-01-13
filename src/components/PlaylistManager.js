import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import EditMode from "./EditMode";

const spotify = new SpotifyWebApi();

function PlaylistManager(props) {
    const playlistId = props.id;
    const [showEditMode, setShowEditMode] = useState(false);
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    //Get all tracks from the selected playlist
    //Fetch loop solution could be improved
    useEffect(() => {
        spotify
            .getPlaylist(playlistId)
            .then(function (playlist) {
                setPlaylistName(playlist.name);
                return playlist.tracks.total;
            })
            .then(function (totalTracks) {
                fetchLoop(totalTracks);
            });

        function fetchLoop(totalTracks) {
            let offset = 0;
            let requestSize = 100;
            let testArray = [];
            let loopAmount = Math.ceil(totalTracks / requestSize);
            for (let i = 0; i < loopAmount; i++) {
                spotify
                    .getPlaylistTracks(playlistId, {
                        offset: offset,
                        limit: requestSize,
                    })
                    .then(function (data) {
                        testArray = testArray.concat(data.items);
                        setPlaylistTracks(...playlistTracks, testArray);
                    });
                offset += requestSize;
            }
        }
    }, []);

    function toggleEditMode() {
        setShowEditMode(!showEditMode);
    }
    //Delete tracks
    function deleteTracks(selectedTracks) {
        spotify.removeTracksFromPlaylist(playlistId, selectedTracks);
        let result = playlistTracks.filter(
            (x) => !selectedTracks.includes(x.track.uri)
        );
        setPlaylistTracks(result);
    }
    //Move Tracks to another playlist
    function transferTracks(id, selectedTracks) {
        spotify.addTracksToPlaylist(id, selectedTracks);
        deleteTracks(selectedTracks);
    }

    let playlistHtml = playlistTracks.map((item) => (
        <li
            className={
                showEditMode
                    ? "whitespace-nowrap h-[26px]"
                    : "whitespace-nowrap h-[26px] pl-6"
            }
            key={item.track.id}
        >
            {item.track.name}
        </li>
    ));

    return (
        <>
            <h2 className="text-2xl font-semibold ">{playlistName}</h2>
            <button
                className="w-20 rounded-full bg-yellow-300"
                onClick={toggleEditMode}
            >
                Simplify
            </button>
            <button
                onClick={() => {
                    props.liftId("");
                }}
            >
                Back to playlists
            </button>
            <div className="flex flex-row w-full ml-12">
                {showEditMode && (
                    <EditMode
                        playlist={playlistTracks}
                        removeTracks={deleteTracks}
                        moveTracks={transferTracks}
                    />
                )}

                <ul className="flex flex-col gap-2 w-3/4 overflow-x-hidden">
                    {playlistHtml}
                </ul>
            </div>
        </>
    );
}

export default PlaylistManager;
