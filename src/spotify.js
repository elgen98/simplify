//Create loginUrl and extract the token from resulting URL
export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const CLIENT_ID = "0aed6757686b4616b75fafaa85b596f5";
const REDIRECT_URI = "http://localhost:3000";
const RESPONSE_TYPE = "token";
const SHOW_DIALOG = true;
const SCOPES =
    "playlist-read-private playlist-modify-private playlist-modify-public";

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});
};

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}&show_dialog=${SHOW_DIALOG}`;
