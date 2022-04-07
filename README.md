# A Spotify like app, you can check the final result [HERE](https://spotfree-84208.web.app/)

## Instructions to run locally

1 - Clone the repo

2 - Create a .env file in your root folder with the following content:

<pre>
<code>
BASE_URL=https://api.spotify.com/v1
ACCOUNTS_BASE_URL=https://accounts.spotify.com
CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
REDIRECT_URI_LOCAL=http://localhost:8080/
</code>
</pre>

change the CLIENT_ID and CLIENT_SECRET values with your personal spotify developer values, you can get them [here](https://developer.spotify.com/dashboard/login)

3 - npm install

4 - npm run start

It will automatically open on localhost:8080
