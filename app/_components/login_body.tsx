'use client'
import SpotifyLogin from "./pkce_spotify_auth"
import { RequestAccessToken } from "./pkce_spotify_auth";
import {getProfile} from "./get_mixtape";
import { useEffect } from "react";
export default function LoginBody(){
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');
        RequestAccessToken()
        getProfile(localStorage.getItem('access_token'))
      })
    return(
        <div className="flex min-h-screen flex-col items-center p-16 space-y-12">
            <h1 className=" text-4xl text-center">Find Your Mixtape</h1>
            <button className='btn-spotify' onClick={SpotifyLogin}>Spotify Login</button>
        </div>
    )
}