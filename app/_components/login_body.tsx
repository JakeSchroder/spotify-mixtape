'use client'
import SpotifyLogin from "../_lib/pkce_spotify_auth"
import { RequestAccessToken } from "../_lib/pkce_spotify_auth";
import {getProfile} from "../_lib/get_mixtape";
import { useEffect, useState } from "react";
export default function LoginBody(){
    const [shouldRunEffect, setShouldRunEffect] = useState(false);

    useEffect(() => {
        if (shouldRunEffect) {
            const urlParams = new URLSearchParams(window.location.search);
            let code = urlParams.get('code');
            RequestAccessToken()
            getProfile(localStorage.getItem('access_token'))
            location.assign('/mixtape');
        }

      },[shouldRunEffect])
    return(
        <div className="flex min-h-screen flex-col items-center p-16 space-y-12">
            <h1 className=" text-4xl text-center">Find Your Mixtape</h1>
            <button className='btn-spotify' onClick={SpotifyLogin}>Spotify Login</button>
        </div>
    )
}