import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import LoadingIcons from "react-loading-icons";
import EditMode from "./EditMode";
import SortAndSearch from "./SortAndSearch";

const spotify = new SpotifyWebApi();

function PlaylistManager(props) {
    const playlistId = props.id;
    const [showEditMode, setShowEditMode] = useState(false);
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    const [searchResult, setSearchResult] = useState([]);
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
                        testArray.sort(function (a, b) {
                            return new Date(a.added_at) - new Date(b.added_at);
                        });
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
        setPlaylistTracks(
            playlistTracks.filter((x) => !selectedTracks.includes(x.track.uri))
        );
        setSearchResult(
            searchResult.filter((x) => !selectedTracks.includes(x.track.uri))
        );
        toggleEditMode();
    }
    //Move Tracks to another playlist
    function transferTracks(id, selectedTracks) {
        spotify.addTracksToPlaylist(id, selectedTracks);
        deleteTracks(selectedTracks);
        toggleEditMode();
    }

    function sortPlaylist(orderedPlaylist) {
        setPlaylistTracks([...orderedPlaylist]);
        setSearchResult([...orderedPlaylist]);
    }

    function showSearchResult(result) {
        setSearchResult(result);
    }

    let playlistHtml = playlistTracks.map((item) => (
        <li className="whitespace-nowrap" key={item.track.id}>
            {item.track.name}
            <div>
                <small>
                    {item.track.artists.map((artist, index) => {
                        return (index ? ", " : "") + artist.name;
                    })}
                </small>{" "}
                - <small>{item.track.album.name}</small>
            </div>
        </li>
    ));

    if (searchResult.length > 0) {
        playlistHtml = searchResult.map((item) => (
            <li className="whitespace-nowrap" key={item.track.id}>
                {item.track.name}
                <div>
                    <small>
                        {item.track.artists.map((artist, index) => {
                            return (index ? ", " : "") + artist.name;
                        })}
                    </small>{" "}
                    - <small>{item.track.album.name}</small>
                </div>
            </li>
        ));
    }

    const renderText = () => {
        if (playlistTracks.length > 0 && showEditMode === false) {
            return (
                <div className="w-full ml-12">
                    <ul className="flex flex-col gap-2 overflow-x-hidden">
                        {playlistHtml}
                    </ul>
                </div>
            );
        } else if (showEditMode === true) {
            return (
                <EditMode
                    playlist={
                        searchResult.length > 0 ? searchResult : playlistTracks
                    }
                    removeTracks={deleteTracks}
                    moveTracks={transferTracks}
                />
            );
        }

        return <LoadingIcons.Circles fill="#F2B705" />;
    };

    return (
        <>
            <h2 className="text-2xl font-semibold ">{playlistName}</h2>
            <SortAndSearch
                playlist={playlistTracks}
                liftPlaylist={sortPlaylist}
                liftSearchResult={showSearchResult}
            />
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
            {renderText()}
        </>
    );
}

export default PlaylistManager;
