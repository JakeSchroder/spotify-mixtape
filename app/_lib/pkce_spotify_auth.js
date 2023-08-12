'use client'
let clientId = '';
let redirectUri = '';

// Code Verifier
function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// Code Challenge
async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
    
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    
    return base64encode(digest);
}

if (typeof window !== "undefined") {
    clientId = '5015dd89db744095996b70ff3fdf46f9';
    if(location.protocol !== 'https:'){
        redirectUri = 'http://'+window.location.host+'/mixtape';
    }
    else{
        redirectUri = 'https://'+window.location.host+'/mixtape';
    }
}

export default function SpotifyLogin(){
        // Request User Authorization
        let codeVerifier = generateRandomString(128);
        
        generateCodeChallenge(codeVerifier).then(codeChallenge => {
            let state = generateRandomString(16);
            let scope = 'user-read-private user-read-email';
            
            localStorage.setItem('code_verifier', codeVerifier);
            
            let args = new URLSearchParams({
                response_type: 'code',
                client_id: clientId,
                scope: scope,
                redirect_uri: redirectUri,
                state: state,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge
            });
            
            window.location.replace('https://accounts.spotify.com/authorize?' + args);
        });
}

export async function RequestAccessToken(){
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    // Request an access token
    let codeVerifier = localStorage.getItem('code_verifier');

    let body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier
    });

    const response = fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            //localStorage.setItem('access_token', data.access_token);
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
            asyncLocalStorage.setItem('access_token', data.access_token).then(()=> {
                return asyncLocalStorage.getItem('access_token');
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });

    return await response
}