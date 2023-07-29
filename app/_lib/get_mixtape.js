'use client'
// Fetches data about user after getting authorized
export async function getProfile(accessToken) {
    accessToken = localStorage.getItem('access_token');
    
    const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=50&offset=0', {
        headers: {
        Authorization: 'Bearer ' + accessToken
        }
    });
    
    const data = await response.json()
    getTrackList(data)
}

async function getTrackList(playlists){
    let playlist_tracks = [];
    let accessToken = localStorage.getItem('access_token');
    let playlist_track_info = [];

    for (let i=0; i<Object.keys(playlists).length; i++){
        playlist_tracks.push(playlists['items'][i]['tracks']['href'])
    }

    for(let i=0; i<Object.keys(playlist_tracks).length; i++){
        const response = await fetch(playlist_tracks[i], {
            headers: {
            Authorization: 'Bearer ' + accessToken
            }
        });
        const data = await response.json()
        for (let i=0; i<Object.keys(data['items']).length; i++){
            playlist_track_info.push(await getTrackInfo(data['items'][i]))
        }

    }


    console.log(playlist_track_info)
}

async function getTrackInfo(track){
    let accessToken = localStorage.getItem('access_token');
    const response = await fetch(`https://api.spotify.com/v1/artists/${track['track']['artists'][0]['id']}`, {
        headers: {
        Authorization: 'Bearer ' + accessToken
        }
    });
    const data = await response.json()

    let track_info = {
        name: track["track"]["name"],
        artist: track['track']['artists'][0]['name'],
        track_popularity: track['track']['popularity'],
        added_at: track['added_at'],
        added_by: track['added_by'],
        lartist_popularity: data['followers']['total'],
    }
    return track_info
}