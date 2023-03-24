import { Component } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { Skeleton, Rate } from 'antd'

import './Movie.css'

const NoImage = () => {
  return <Skeleton.Image style={{ width: '100%', height: '100%', position: 'absolute', top: '0', borderRadius: '0' }} />
}

export default class Movie extends Component {
  static propTypes = {
    label: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    path: PropTypes.string,
    rating: PropTypes.number,
    genresAll: PropTypes.array,
    genreIds: PropTypes.array,
    sessionId: PropTypes.string,
    movieService: PropTypes.object,
    movieId: PropTypes.number,
  }

  render() {
    const { label, date, description, path, rating, genresAll, genreIds, sessionId, movieService, movieId } = this.props

    const urlImg = 'https://image.tmdb.org/t/p/original'

    const cutDescription = (str) => {
      if (!str) return 'Has no overview'
      if (str.length < 100) return str
      return `${str.split(' ').slice(0, 18).join(' ')} ...`
    }

    const onRated = (val) => {
      if (val === 0) {
        return movieService.delRating(movieId, sessionId)
      } else {
        localStorage.setItem(movieId, val)
        return movieService.rateMovie(movieId, sessionId, val)
      }
    }

    let containerStyle
    if (rating === 0) {
      containerStyle = { borderColor: '#c9c9c9' }
    } else if (rating >= 0 && rating < 3) {
      containerStyle = { borderColor: '#E90000' }
    } else if (rating >= 3 && rating < 5) {
      containerStyle = { borderColor: '#E97E00' }
    } else if (rating >= 5 && rating < 7) {
      containerStyle = { borderColor: '#E9D100' }
    } else {
      containerStyle = { borderColor: '#66E900' }
    }

    const filteredGenres = genresAll.filter((genre) => genreIds.includes(genre.id))
    const genres = filteredGenres.map((item) => {
      return (
        <span key={item.name} className="movie__genre">
          {item.name}
        </span>
      )
    })

    const starRating = Number(localStorage.getItem(movieId))

    return (
      <div className="movie">
        <div className="movie__image-content">
          {path ? <img className="movie__image" src={`${urlImg}${path}`} alt="movie poster" /> : <NoImage />}
        </div>
        <div className="movie__text-content">
          <h1 className="movie__name">{label}</h1>
          <span className="movie__rating" style={containerStyle}>
            {rating.toFixed(1)}
          </span>
          <span className="movie__date">{date ? format(new Date(date), 'MMMM dd, yyyy') : 'Release date unknown'}</span>
          <div className="movie__genres">{genres}</div>
          <p className="movie__description">{cutDescription(description)}</p>
          <Rate
            allowHalf
            defaultValue={starRating}
            onChange={(val) => onRated(val)}
            count={10}
            className="movie__stars"
          />
        </div>
      </div>
    )
  }
}
