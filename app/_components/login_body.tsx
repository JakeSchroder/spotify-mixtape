'use client'
import SpotifyLogin from "../_lib/pkce_spotify_auth"
export default function LoginBody(){

    function onClick(){
        SpotifyLogin();
        location.assign('/mixtape');
    }
    return(
        <div className="flex min-h-screen flex-col items-center p-16 space-y-12">
            <h1 className=" text-4xl text-center">Find Your Mixtape</h1>
            <button className='btn-spotify' onClick={onClick}>Spotify Login</button>
        </div>
    )
}