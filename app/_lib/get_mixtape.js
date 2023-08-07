'use client'

// Fetches data about user after getting authorized
export async function getUserPlaylists() {
    let accessToken = localStorage.getItem('access_token');
    
    try{
        const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=50&offset=0', {
            headers: {
            Authorization: 'Bearer ' + accessToken
            }
        });
        
        const data = await response.json()
        getPlaylistItems(data);
    }
    catch(error){
        const message = getErrorMessage(error);
        console.error(message);
        res.status(500).send({ message });
    }

}

async function getPlaylistItems(playlists){
    let playlist_tracks = [];
    let accessToken = localStorage.getItem('access_token');
    let playlist_track_info = [];

    try{
        for (let i=0; i<Object.keys(playlists['items']).length; i++){
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
                playlist_track_info.push(await queueTrackObject(data['items'][i]))
            }
        }
    
        createMixtape(playlist_track_info)

    }
    catch(error){
        const message = getErrorMessage(error);
        console.error(message);
        res.status(500).send({ message });
    }

}

async function createMixtape(playlist_track_info){
    const currentDate = new Date();
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    const sixMonthsAgo = new Date(currentDate);
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setMonth(currentDate.getMonth() - 12);

    playlist_track_info.sort((a, b)=> a.track_popularity - b.track_popularity)
    let mixtapeOneMonth = playlist_track_info.filter((a)=> {
        const givenDate = new Date(a.added_at);
        if (givenDate > oneMonthAgo) {
            return true;
        }
    })
    localStorage.setItem('mixtapeOneMonth', JSON.stringify(mixtapeOneMonth.slice(0,10)));

    let mixtapeSixMonths = playlist_track_info.filter((a)=> {
        const givenDate = new Date(a.added_at);
        if (givenDate > sixMonthsAgo) {
            return true;
        }
    })
    localStorage.setItem('mixtapeSixMonths', JSON.stringify(mixtapeSixMonths.slice(0,10)));
    let mixtapeOneYear = playlist_track_info.filter((a)=> {
        const givenDate = new Date(a.added_at);
        if (givenDate > oneYearAgo) {
            return true;
        }
    })
    localStorage.setItem('mixtapeOneYear', JSON.stringify(mixtapeOneYear.slice(0,10)));

    localStorage.setItem('mixtapeAllTime', JSON.stringify(playlist_track_info.slice(0,10)));

}

async function queueTrackObject(track){
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
        artist_popularity: data['followers']['total'],
    }
    return track_info
}