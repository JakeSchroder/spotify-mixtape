'use client'

// Fetches data about user after getting authorized
export async function getProfile() {
    let accessToken = localStorage.getItem('access_token');
  
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    const data = await response.json();
    return new Promise((resolve, reject)=>{
        localStorage.setItem('user_name', data['display_name'])
        resolve()
    })
  }

export async function mainMixtape(){
    const response = getUserPlaylists()
    .then((data) => getPlaylistItems(data))
    .then(createMixtape)

    return await response
}

export async function getUserPlaylists() {
    let accessToken = localStorage.getItem('access_token');
    
    try{
        const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=50&offset=0', {
            headers: {
            Authorization: 'Bearer ' + accessToken
            }
        });
        if (!response.ok) {
            throw new Error("getUserPlaylists: " + response.status);
        }
        
        const data = await response.json()
        return new Promise((resolve, reject) => {
            resolve(data)
        });
    }
    catch(error){
        console.error(error);
    }
}

async function getPlaylistItems(playlists){
    let playlist_tracks = [];
    let promises = [];
    let playlist_track_info = [];

    try{
        for (let i=0; i<Object.keys(playlists['items']).length; i++){
            playlist_tracks.push(playlists['items'][i]['tracks']['href'])
        }
    
        for(let i=0; i<Object.keys(playlist_tracks).length; i++){
            promises.push(getTracks(playlist_tracks[i], playlist_track_info))
        }
    }
    catch(error){
        console.error(error);
    }
    await Promise.all(promises)
    return new Promise((resolve, reject) => {
        resolve(Promise.all(playlist_track_info))
    });
}

async function getTracks(playlist_track, playlist_track_info){
    let accessToken = localStorage.getItem('access_token');

    try{
        const response = await fetch(playlist_track, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
        if (!response.ok) {
            throw new Error("getPlaylistTracks: " + response.status);
        }
        const data = await response.json()
        for (let i=0; i<Object.keys(data['items']).length; i++){
            playlist_track_info.push(queueTrackObject(data['items'][i]))
        }
    }
    catch(error){
        console.error(error);
    }

    return new Promise((resolve, reject) => {
        resolve()
    });
}

async function queueTrackObject(track){
    let track_info = {
        name: track["track"]["name"],
        artist: track['track']['artists'][0]['name'],
        track_popularity: track['track']['popularity'],
        added_at: track['added_at'],
        added_by: track['added_by'],
    }
    return track_info
}

async function createMixtape(playlist_track_info){
    const currentDate = new Date();
    const oneMonthAgo = new Date(currentDate);
    const sixMonthsAgo = new Date(currentDate);
    const oneYearAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
    oneYearAgo.setMonth(currentDate.getMonth() - 12);
    const asyncLocalStorage = {
        setItem(key, value) {
            return Promise.resolve().then(()=> {
                localStorage.setItem(key, value);
            });
        },
        getItem(key) {
            return Promise.resolve().then(()=> {
                return localStorage.getItem(key);
            });
        }
    };


    playlist_track_info.sort((a, b)=> a.track_popularity - b.track_popularity)
    let mixtapeOneMonth = playlist_track_info.filter((a)=> {
        const givenDate = new Date(a.added_at);
        if (givenDate > oneMonthAgo) {
            return true;
        }
    })

    let mixtapeSixMonths = playlist_track_info.filter((a)=> {
        const givenDate = new Date(a.added_at);
        if (givenDate > sixMonthsAgo) {
            return true;
        }
    })

    let mixtapeOneYear = playlist_track_info.filter((a)=> {
        const givenDate = new Date(a.added_at);
        if (givenDate > oneYearAgo) {
            return true;
        }
    })
    const response = asyncLocalStorage.setItem('mixtapeOneMonth', JSON.stringify(mixtapeOneMonth.slice(0,10))).then(()=> {
        return asyncLocalStorage.getItem('mixtapeOneMonth');
    }).then(
    asyncLocalStorage.setItem('mixtapeSixMonths', JSON.stringify(mixtapeSixMonths.slice(0,10))).then(()=> {
        return asyncLocalStorage.getItem('mixtapeSixMonths');
    })).then(
    asyncLocalStorage.setItem('mixtapeOneYear', JSON.stringify(mixtapeOneYear.slice(0,10))).then(()=> {
        return asyncLocalStorage.getItem('mixtapeOneYear');
    })).then(
    asyncLocalStorage.setItem('mixtapeAllTime', JSON.stringify(playlist_track_info.slice(0,10))).then(()=> {
        return asyncLocalStorage.getItem('mixtapeAllTime');
    }))
    console.log(response)

    return await response
}