import { useState, useEffect, useLayoutEffect } from "react"
import { getToken } from "../../assets/fetchFuntions"
import { Card } from "../../components/Card"
import { RowList } from "../../components/RowList"
import './Home.css'

export const Home = () => {

  const [newRealeases, setNewReleases] = useState([]);
  const [featuredPlaylists, setFeaturedPlayLists] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      getToken().then(res => localStorage.setItem('token', res))

    }
  }, [])

  useLayoutEffect(() => {
    const token = localStorage.getItem('token')
    fetch('https://api.spotify.com/v1/browse/new-releases',
      {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then(res => res.json())
      .then(res => setNewReleases(res.albums.items))
      .then(console.log(newRealeases))
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('https://api.spotify.com/v1/browse/featured-playlists',
      {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then(res => res.json())
      .then(res => setFeaturedPlayLists(res.playlists.items))
      .then(console.log(featuredPlaylists))
  }, [])



  return (
    <section className="home-container">

      <RowList title='Released this week' id='released'>
        {newRealeases?.map(album => {
          return (
            <Card
              key={album.id}
              name={album.name}
              author={album.artists.map(artist => artist.name).join(', ')}
              imgUrl={album.images[1].url}
            />
          )
        })}
      </RowList>
      <RowList title='Featured Playlist' id='playlist'>
        {featuredPlaylists?.map(playlist => {
          return (
            <Card
              key={playlist.id}
              name={playlist.name}
              author={playlist.description.length>48?`${playlist.description.substring(0, 48)}...`:playlist.description}
              imgUrl={playlist.images[0].url}
            />
          )
        })}
      </RowList>
      <RowList title='Genders' id='genders'>
        <Card name='titulo 9' />
        <Card name='titulo 9' />
        <Card name='titulo 9' />
        <Card name='titulo 9' />
      </RowList>
      <RowList title='other' id='other'>
        <Card name='titulo 9' />
        <Card name='titulo 9' />
        <Card name='titulo 9' />
        <Card name='titulo 9' />
      </RowList>
    </section>
  )
}
