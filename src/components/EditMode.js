import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import PlaylistSelection from "./PlaylistSelection";
import { BiTransfer } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

function EditMode(props) {
    const playlist = props.playlist;
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [open, setOpen] = useState(false);

    //Toggle selection status
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
    //Get id from PlaylistSelection Modal and lifting to PlaylistManager
    function selectReceiver(playlistId) {
        props.moveTracks(playlistId, selectedTracks);
        setSelectedTracks([]);
    }

    function terminateModal() {
        setOpen(false);
    }

    let playlistHtml = playlist.map((item) => (
        <label
            key={item.track.id}
            className="flex items-center h-12 whitespace-nowrap w-full"
        >
            <input
                className="w-6 h-6 animate-slidingElement align-middle mr-2 flex-none"
                type="checkbox"
                name="track"
                value={item.track.uri}
                onChange={toggleChecked}
            />
            <div className="text-ellipsis overflow-x-hidden">
                <div className="text-ellipsis overflow-x-hidden">
                    {item.track.name}
                </div>
                <small>
                    {item.track.artists.map((artist, index) => {
                        return (index ? ", " : "") + artist.name;
                    })}
                </small>{" "}
                - <small>{item.track.album.name}</small>
            </div>
        </label>
    ));

    return (
        <>
            {selectedTracks.length > 0 && (
                <div className="fixed top-83% right-0 md:right-20% md:top-1/3 lg:top-1/4 lg:right-1/4 flex flex-col gap-3 m-3">
                    <button
                        className="px-3 py-3 w-full bg-red-600 rounded-full"
                        title="Delete"
                        onClick={() => {
                            props.removeTracks(selectedTracks);
                            setSelectedTracks([]);
                        }}
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
                {open && (
                    <PlaylistSelection
                        liftId={selectReceiver}
                        closeModal={terminateModal}
                    />
                )}
            </Modal>
            <div className="flex flex-col gap-2 overflow-x-hidden w-11/12">
                {playlistHtml}
            </div>
        </>
    );
}

export default EditMode;
