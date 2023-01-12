import React from "react";
import { useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Modal from "./Modal";
import PlaylistSelection from "./PlaylistSelection";
import { BiTransfer } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const spotify = new SpotifyWebApi();

function EditMode(props) {
    const playlist = props.playlist;
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [open, setOpen] = useState(false);

    function toggleChecked(e) {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedTracks([...selectedTracks, value]);
        } else {
            setSelectedTracks(
                selectedTracks.filter((track) => track !== value)
            );
        }
    }

    function selectReceiver(playlistId) {
        props.moveTracks(playlistId, selectedTracks);
    }

    let playlistHtml = playlist.map((item) => (
        <label key={item.track.id} className="whitespace-nowrap ">
            <input
                className=" w-6 h-6 align-middle"
                type="checkbox"
                name="track"
                value={item.track.uri}
                onChange={toggleChecked}
            />

            {item.track.name}
        </label>
    ));

    return (
        <>
            {selectedTracks.length > 0 && (
                <div className="fixed top-0 right-0 flex flex-col gap-2 m-3">
                    <button
                        className="px-3 py-3 w-full bg-red-600 rounded-full"
                        title="Delete"
                        onClick={() => props.removeTracks(selectedTracks)}
                    >
                        <MdDelete />
                    </button>
                    <button
                        className="px-3 py-3 bg-orange-400 rounded-full"
                        title="Transfer"
                        onClick={() => setOpen(true)}
                    >
                        <BiTransfer />
                    </button>
                </div>
            )}
            <Modal open={open} onClose={() => setOpen(false)}>
                <h2 className="font-semibold text-lg text-center">
                    Select receiving playlist
                </h2>
                <PlaylistSelection liftId={selectReceiver} />
            </Modal>
            <div className="flex flex-col gap-2 w-3/4 overflow-x-hidden">
                {playlistHtml}
            </div>
        </>
    );
}

export default EditMode;
