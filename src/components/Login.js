import React from "react";
import { loginUrl } from "../spotify";
//Login component
function Login() {
    return (
        <main className=" flex flex-col justify-center items-center gap-40 min-h-screen bg-nice-gray">
            <h1 className=" text-5xl text-nice-yellow font-outline-05">
                Simplify
            </h1>
            <a
                href={loginUrl}
                className="rounded-full inline-block w-60 h-14 text-center pt-4 bg-gray-600 text-nice-yellow"
            >
                Login with Spotify
            </a>
        </main>
    );
}

export default Login;
