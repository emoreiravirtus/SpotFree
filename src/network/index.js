const BASE_URL = process.env.BASE_URL;
const ACCOUNTS_BASE_URL = process.env.ACCOUNTS_BASE_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

let accessToken = '';
let refresh_token = '';

export const getAuthorization = () => {
  let uri = `${ACCOUNTS_BASE_URL}/authorize?`;
  uri += `client_id=${CLIENT_ID}`;
  uri += `&response_type=code`;
  uri += `&redirect_uri=${encodeURI(REDIRECT_URI)}`;

  window.location.href = uri; 
}

export const setTokens = () => {
  accessToken = localStorage.getItem('access_token');
  refresh_token = localStorage.getItem('refresh_token');
}

export const getCode = () => {
  let code = null;
  const queryString = window.location.search;

  if ( queryString.length > 0 ) {
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get('code');
  }

  return code;
}

export const fetchAccessToken = code => {
  let body = 'grant_type=authorization_code';
  body += `&code=${code}`;
  body += `&redirect_uri=${encodeURI(REDIRECT_URI)}`;
  body += `&client_id=${CLIENT_ID}`;
  body += `&client_secret=${CLIENT_SECRET}`;

  callAuthorizationApi(body);
}

const callAuthorizationApi = async body => {
  
  return await fetch(`${ACCOUNTS_BASE_URL}/api/token`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${ btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`
    }
  })
  .then(async response => {
    let data = await response.json();
    
    if(data.access_token) {
      localStorage.setItem('access_token', data.access_token);
    }

    if(data.refresh_token) {
      localStorage.setItem('refresh_token', data.refresh_token)
    }
  })
}

export const getLibraries = () => {

  return fetch(`${BASE_URL}/browse/categories`, { 
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Bearer ${accessToken}`
    }
   })
    .then(async response => {
      let data = await response.json();
      data = data.categories.items;
      
      let outputList = data.map(i => {
        return {
          title: i.name,
          src: i.icons[0].url,
          id: i.id
        }
      })
      return outputList;

    })
}

export const getSongs = categoryId => {

  return fetch(`${BASE_URL}/browse/categories/${categoryId}/playlists`, { 
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Bearer ${accessToken}`
    }
   })
    .then(async response => {
      const data = await response.json();
      const playlistiD = data.playlists.items[0].id;

      return fetch(`${BASE_URL}/playlists/${playlistiD}`, { 
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${accessToken}`
        }
       })
        .then(async response => {
          const data = await response.json();
          return data.tracks.items;
        });
    })
}

export const playTrack = id => {
  return fetch(`${BASE_URL}/tracks/${id}`, { 
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Bearer ${accessToken}`
    }
   })
    .then(async response => {
      const data = await response.json();

      localStorage.setItem('currentTrackId', data.id);
      return data;
    })
}