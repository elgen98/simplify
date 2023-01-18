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
    //Kill Modal
    function terminateModal() {
        setOpen(false);
    }

    // HTML //
    let playlistHtml = playlist.map((item) => (
        <label
            key={item.track.id}
            className="flex items-center h-12 whitespace-nowrap w-full drop-shadow-blueText pointer-events-none"
        >
            <input
                className="w-6 h-6 animate-slidingElement align-middle mr-2 flex-none pointer-events-auto cursor-pointer"
                type="checkbox"
                name="track"
                value={item.track.uri}
                onChange={toggleChecked}
            />
            <div className="text-ellipsis overflow-x-hidden ">
                <div className="text-ellipsis overflow-x-hidden ">
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
            <div className="flex flex-col gap-2 overflow-x-hidden w-11/12">
                {selectedTracks.length > 0 && (
                    <div className="fixed flex flex-col gap-2 left-85% top-85% xl:left-2/3 xl:top-1/4 3xl:left-60% 3xl:top-20% 4xl:left-55% 4xl:top-15%">
                        <button
                            className="px-3 py-3 bg-red-600 rounded-full"
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
                {playlistHtml}
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <h2 className="font-bold text-xl text-nice-blue font-outline-05">
                    Select receiving playlist
                </h2>
                {open && (
                    <PlaylistSelection
                        liftId={selectReceiver}
                        closeModal={terminateModal}
                    />
                )}
            </Modal>
        </>
    );
}

export default EditMode;
