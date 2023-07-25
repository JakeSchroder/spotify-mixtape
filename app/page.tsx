'use client'
import SpotifyLogin from "./pkce_spotify_auth"
import { getProfile, RequestAccessToken } from "./pkce_spotify_auth";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    RequestAccessToken()
    getProfile(localStorage.getItem('access_token'))
  })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button className='btn-primary' onClick={SpotifyLogin}>Spotify Login</button>
    </main>
  )
}
