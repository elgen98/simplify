import React from "react";

function SortAndSearch(props) {
    let playlist = props.playlist;

    function sorting(e) {
        if (e.target.value === "oldest") {
            playlist.sort(function (a, b) {
                return new Date(a.added_at) - new Date(b.added_at);
            });
        }
        if (e.target.value === "recent") {
            playlist.sort(function (a, b) {
                return new Date(b.added_at) - new Date(a.added_at);
            });
        }
        if (e.target.value === "A-Ö") {
            playlist.sort(function (a, b) {
                let nameA = a.track.name.toUpperCase();
                let nameB = b.track.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
        }
        console.log(playlist);
        props.liftPlaylist(playlist);
    }

    return (
        <div>
            <>
                <div>
                    <label for="sort">Sort playlist</label>
                    <select name="sort" id="sort" onChange={(e) => sorting(e)}>
                        <option value="oldest">Oldest</option>
                        <option value="recent">Recent</option>
                        <option value="A-Ö">A-Ö</option>
                    </select>
                </div>
            </>
        </div>
    );
    {
    }
}

export default SortAndSearch;
