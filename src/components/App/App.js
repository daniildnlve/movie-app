import { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Tabs } from 'antd'

import MovieList from '../MovieList/MovieList'
import ErrorNetwork from '../Errors/ErrorNetwork'
import { MovieServiceProvider, MovieServiceConsumer } from '../movie-service-context/movie-service-context'
import MovieService from '../../services/movie-service'

import './App.css'

const items = [
  {
    key: '1',
    label: 'Search',
    children: (
      <MovieServiceConsumer>
        {([, , sessionId]) => {
          return <MovieList sessionId={sessionId} name={items[0].label} />
        }}
      </MovieServiceConsumer>
    ),
  },
  {
    key: '2',
    label: 'Rated',
    children: (
      <MovieServiceConsumer>
        {([, , sessionId]) => {
          return <MovieList sessionId={sessionId} name={items[1].label} />
        }}
      </MovieServiceConsumer>
    ),
  },
]

const MovieTabs = () => (
  <Tabs defaultActiveKey="1" centered items={items} className="tabs" size="large" destroyInactiveTabPane="true" />
)

export default class App extends Component {
  movieServie = new MovieService()

  state = {
    genres: [],
    sessionId: '',
  }

  componentDidMount() {
    localStorage.clear()
    this.movieServie.guestSession().then((result) => {
      this.setState({
        sessionId: result.guest_session_id,
      })
    })
    this.movieServie.getGenres().then((result) => {
      this.setState({
        genres: result.genres,
      })
    })
  }

  render() {
    return (
      <div>
        <MovieServiceProvider value={[this.state.genres, this.movieServie, this.state.sessionId]}>
          <Online>
            <MovieTabs />
          </Online>
          <div className="page">
            <Offline>
              <ErrorNetwork />
            </Offline>
          </div>
        </MovieServiceProvider>
      </div>
    )
  }
}
