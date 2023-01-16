import React from "react";

function SortAndSearch(props) {
    let playlist = props.playlist;

    function dateComparison(a, b) {
        const date1 = new Date(a.added_at);
        const date2 = new Date(b.added_at);

        return date2 - date1;
    }
    return (
        <div>
            <button
                onClick={() => {
                    playlist.sort(dateComparison);
                    console.log(playlist);
                    props.liftPlaylist(playlist);
                }}
            ></button>
        </div>
    );
}

export default SortAndSearch;
