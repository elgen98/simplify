import React, { useState } from "react";

function SortAndSearch(props) {
    let playlist = props.playlist;
    const [q, setQ] = useState("");

    function sorting(sortBy) {
        if (sortBy === "oldest") {
            playlist.sort(function (a, b) {
                return new Date(a.added_at) - new Date(b.added_at);
            });
        }
        if (sortBy === "recent") {
            playlist.sort(function (a, b) {
                return new Date(b.added_at) - new Date(a.added_at);
            });
        }
        if (sortBy === "A-Ö") {
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
        props.liftPlaylist(playlist);
    }

    function searchItems(searchQuery) {
        setQ(searchQuery);
        const filteredData = playlist.filter((item) => {
            let result;
            result = Object.values(item.track.album)
                .join("")
                .toLowerCase()
                .includes(q.toLowerCase());

            result += Object.values(item.track)
                .join("")
                .toLowerCase()
                .includes(q.toLowerCase());

            for (let i = 0; i < item.track.artists.length; i++) {
                result += Object.values(item.track.artists[i])
                    .join("")
                    .toLowerCase()
                    .includes(q.toLowerCase());
            }
            return result;
        });
        console.log(filteredData);
        props.liftSearchResult(filteredData);
    }

    return (
        <div>
            <div>
                <label htmlFor="search-form">Search</label>
                <input
                    type="text"
                    id="search-form"
                    name="search-form"
                    placeholder="Search Song, Artist, or Album"
                    value={q}
                    onChange={(e) => searchItems(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="sort">Sort</label>
                <select
                    name="sort"
                    id="sort"
                    onChange={(e) => sorting(e.target.value)}
                >
                    <option value="oldest">Oldest</option>
                    <option value="recent">Recent</option>
                    <option value="A-Ö">A-Ö</option>
                </select>
            </div>
        </div>
    );
}

export default SortAndSearch;
