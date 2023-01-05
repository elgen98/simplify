import React, { Component } from 'react'

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=0aed6757686b4616b75fafaa85b596f5&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-email%20user-read-private%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-private%20playlist-modify-public'

export default class Login extends Component {
  render() {
    return (
      <div>
        <a class="" href={AUTH_URL}>Login With Spotify</a>
      </div>
    )
  }
}
