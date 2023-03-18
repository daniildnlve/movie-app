export default class MovieService {

  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`  `, received ${res.status}`)
    }
    return await res.json();
  }

  async getMovies(query, page) {
    if (!query) {
      const popular = await this.getResource(`https://api.themoviedb.org/3/movie/popular?api_key=dd70c832d6776001d8bb97c84b4e095c&language&language=en-US&page=${page}`);
      return popular;
    }
    const res = await this.getResource(`https://api.themoviedb.org/3/search/movie?api_key=dd70c832d6776001d8bb97c84b4e095c&language=en-US&query=${query}&page=${page}`);
    return res;
  }
}
