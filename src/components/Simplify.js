import React, { useState } from "react";
import PlaylistManager from "./PlaylistManager";
import PlaylistSelection from "./PlaylistSelection";
import { BsGithub, BsLinkedin } from "react-icons/bs";

function Simplify() {
    const [playlistId, setPlaylistId] = useState("");

    function selectPlaylist(playlistId) {
        setPlaylistId(playlistId);
    }
    return (
        <>
            {/* Header */}
            <header className=" w-full flex justify-between items-center p-2 md:w-3/4 xl:w-2/4 2xl:w-2/5">
                <h1 className="text-xl font-bold text-nice-yellow font-outline-05">
                    Simplify
                </h1>
                <nav>
                    <button
                        className=" py-2 w-20 bg-gray-600 rounded-full text-nice-yellow font-semibold"
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        Log out
                    </button>
                </nav>
            </header>
            {/* Main */}
            {/* If playlistId is selected, move to manager. Otherwise shows playlistSelection */}
            <main className=" w-full flex flex-col items-center justify-center gap-4 md:w-3/4 xl:w-2/4 2xl:w-2/5">
                {playlistId ? (
                    <PlaylistManager id={playlistId} liftId={selectPlaylist} />
                ) : (
                    <>
                        <h2 className="text-2xl 3xl:text-3xl font-semibold text-nice-orange font-outline-05 ">
                            Your Playlists
                        </h2>
                        <PlaylistSelection liftId={selectPlaylist} />
                    </>
                )}
            </main>
            {/* Footer */}
            <footer className="w-full bg-gray-600 flex justify-center mt-auto">
                <div className="flex items-center justify-center gap-28 p-2 md:w-3/4 xl:w-2/4 2xl:w-2/5">
                    <a
                        href="https://github.com/elgen98"
                        target="_blank"
                        title="GitHub Project"
                        className="text-3xl text-slate-100"
                    >
                        <BsGithub />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/elliot-blomqvist-04946516a/"
                        target="_blank"
                        title="My Linkedin"
                        className="text-3xl text-slate-100"
                    >
                        <BsLinkedin />
                    </a>
                </div>
            </footer>
        </>
    );
}

export default Simplify;
