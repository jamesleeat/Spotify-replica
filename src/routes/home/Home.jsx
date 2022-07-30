import { Card } from "../../components/Card"
import { RowList } from "../../components/RowList"
import './Home.css'
import { useContext } from "react";
import { authContext } from "../../context/authContext";
import { useGetData } from "../../hooks/useGetData";
import { newRealeasesUrl, featuredPlaylistsUrl, browseUrl, userPlaylistUrl, userTopArtistsUrl, userTopTracksUrl } from "../../api/endpoints";
import { Link } from "react-router-dom";




export const Home = () => {

  const { loggedIn, user } = useContext(authContext)

  const { data: newRealeases, loading: newRealeasesLoading, error: newRealeasesError } = useGetData(newRealeasesUrl, loggedIn, false)
  const { data: featuredPlaylists, loading: featuredPlaylistsLoading, error: featuredPlaylistsError } = useGetData(featuredPlaylistsUrl, loggedIn, false)
  const { data: browse, loading: browseLoading, error: browseError } = useGetData(browseUrl, loggedIn, false)
  const { data: userPlaylist, loading: userPlaylistLoading, error: userPlaylistError } = useGetData(userPlaylistUrl, loggedIn, true)
  const { data: userTopArtists, loading: userTopArtistsLoading, error: userTopArtistsError } = useGetData(userTopArtistsUrl, loggedIn, true)
  const { data: userTopTracks, loading: userTopTracksLoading, error: userTopTracksError } = useGetData(userTopTracksUrl, loggedIn, true)


  return (
    <section className="home-container">

      {loggedIn &&
        <>
          <RowList title='Your playlists' id='userPlaylist'>
            {userPlaylistLoading && <p>loading...</p>}
            {userPlaylistError && <p>ocurrió un error: {userPlaylistError.error?.message}</p>}
            {userPlaylist?.items.map(playlist => {
              return (
                <Link to={'/playlist/' + playlist.id} key={playlist.id}>
                <Card
                  name={playlist.name.length > 30 ? `${playlist.name.substring(0, 30)}...` : playlist.name}
                  author={playlist.description.length > 48 ? `${playlist.description.substring(0, 40)}...` : playlist.description}
                  imgUrl={playlist.images[0].url}
                />
                </Link>
              )
            })}
          </RowList>
          <RowList title='Your top artists' id='topArtists'>
            {userTopArtistsLoading && <p>loading...</p>}
            {userTopArtistsError && <p>ocurrió un error: {userTopArtistsError.error?.message}</p>}
            {userTopArtists?.items.map(artist => {
              return (
                <Card
                  type='artist'
                  key={artist.id}
                  name={artist.name.length > 30 ? `${artist.name.substring(0, 30)}...` : artist.name}
                  author={artist.type}
                  imgUrl={artist.images[0].url}
                />
              )
            })}
          </RowList>
          <RowList title='Your top tracks' id='topTracks'>
            {userTopTracksLoading && <p>loading...</p>}
            {userTopTracksError && <p>ocurrió un error: {userTopTracksError.error?.message}</p>}
            {userTopTracks?.items.map(track => {
              return (
                <Card
                  key={track.id}
                  name={track.name.length > 30 ? `${track.name.substring(0, 30)}...` : track.name}
                  author={track.artists.map(artist => artist.name).join(', ')}
                  imgUrl={track.album.images[0].url}
                />
              )
            })}
          </RowList>
        </>
      }

      <RowList title='Released this week' id='released'>
        {newRealeasesLoading && <p>loading...</p>}
        {newRealeasesError && <p>ocurrió un error: {newRealeasesError.error?.message}</p>}
        {newRealeases?.albums.items.map(album => {
          return (
            <Card
              key={album.id}
              name={album.name.length > 30 ? `${album.name.substring(0, 30)}...` : album.name}
              author={album.artists.map(artist => artist.name).join(', ')}
              imgUrl={album.images[0].url}
            />
          )
        })}
      </RowList>
      <RowList title='Featured Playlist' id='playlist'>
        {featuredPlaylistsLoading && <p>loading...</p>}
        {featuredPlaylistsError && <p>ocurrió un error: {featuredPlaylistsError.error?.message}</p>}
        {featuredPlaylists?.playlists.items.map(playlist => {
          return (
            <Card
              key={playlist?.id}
              name={playlist?.name}
              author={playlist?.description.length > 48 ? `${playlist?.description.substring(0, 40)}...` : playlist?.description}
              imgUrl={playlist?.images[0].url}
            />
          )
        })}
      </RowList>
      <RowList title='Browse' id='browse'>
        {browseLoading && <p>loading...</p>}
        {browseError && <p>ocurrió un error: {browseError.error?.message}</p>}
        {browse?.categories.items.map(category => {
          return (
            <Card
              key={category.id}
              name={category.name}
              imgUrl={category.icons[0].url}
            />
          )
        })}
      </RowList>
    </section>
  )
}
