export default class MovieService {
  async getResource(url) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}``, received ${res.status}`)
    }
    return await res.json()
  }

  domen = 'https://api.themoviedb.org/3'
  apiKey = 'api_key=dd70c832d6776001d8bb97c84b4e095c'

  async getMovies(query, page) {
    if (!query) {
      const popular = await this.getResource(
        `${this.domen}/movie/popular?${this.apiKey}&language&language=en-US&page=${page}`
      )
      return popular
    }
    const res = await this.getResource(
      `${this.domen}/search/movie?${this.apiKey}&language=en-US&query=${query}&page=${page}`
    )
    return res
  }

  async getGenres() {
    const genres = await this.getResource(`${this.domen}/genre/movie/list?${this.apiKey}&language=en-US`)
    return genres
  }

  async guestSession() {
    const res = await this.getResource(`${this.domen}/authentication/guest_session/new?${this.apiKey}`)
    return res
  }

  async rateMovie(movieId, sessionId, value) {
    const res = await fetch(`${this.domen}/movie/${movieId}/rating?${this.apiKey}&guest_session_id=${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        value: value,
      }),
    })
    return await res.json()
  }

  async delRating(movieId, sessionId) {
    const res = await fetch(`${this.domen}/movie/${movieId}/rating?${this.apiKey}&guest_session_id=${sessionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
    return await res.json()
  }

  async getRatedMovies(sessionId, page) {
    const rated = await this.getResource(
      `${this.domen}/guest_session/${sessionId}/rated/movies?${this.apiKey}&language=en-US&sort_by=created_at.asc&page=${page}`
    )
    return rated
  }
}
