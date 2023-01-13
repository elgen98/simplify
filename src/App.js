import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PlaylistManager from "./components/PlaylistManager";
import PlaylistSelection from "./components/PlaylistSelection";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="manager" element={<PlaylistManager />}>
                    <Route path="playlists" element={<PlaylistSelection />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
