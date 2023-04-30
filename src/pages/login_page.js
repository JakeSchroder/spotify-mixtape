import SpotifyLogin from "./scripts/spotify_login"

export default function LoginPage(){
    function handleClick(){
        SpotifyLogin();
    }

    return(
        <>
            <div>
                <button onClick={handleClick} className='w-40 rounded-full border-white bg-white text-black font-semibold' id="login-to-spotify" name='login-to-spotifys'>Login to Spotify</button>
            </div>
        
        </>
    )
}