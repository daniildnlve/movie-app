import { Component } from 'react';
import { Pagination } from 'antd';
import Movie from '../Movie/Movie';
import ErrorFind from '../Errors/ErrorFind';
import MovieService from '../../services/movie-service';
import Spinner from '../Spinner/Spinner';
import ErrorLoad from '../Errors/ErrorLoad';
import SearchMovies from "../SearchMovie/SearchMovies";
import './MovieList.css';

export default class MovieList extends Component {
  
  movieService = new MovieService();

  state = {
    movies: [],
    isLoading: true,
    error: false,
    query: '',
    page: 1,
    total: 0,
    pageQty: 1,
    notFind: false
  }

  componentDidMount() {
    this.updateList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query || this.state.page !== prevState.page) {
      this.updateList();
    }
  }

  setQuery = (str) => {
    this.setState({
      query: str,
      page: 1
    })
  } 

  setPage = (num) => {
    this.setState({
      page: num
    })
  }

  onError = (err) => {
    this.setState({
      error: true,
      isLoading: false
    })
  }

  updateList() {
    this.setState({
      isLoading: true,
      notFind: false
    })
    this.movieService.getMovies(this.state.query, this.state.page) 
      .then(items => {
        if (!items.total_results) {
          this.setState({
            isLoading: false,
            movies: [],
            total: 0,
            notFind: true
          })
          return
        }
        console.log(items)
        if (items.total_results > 10000) {
          items.total_results = 10000
        }
        this.setState({
          movies: items.results,
          isLoading: false,
          total: items.total_results,
          pageQty: items.total_pages,
        })
      })
      .catch(this.onError);
  }
  
  render() {
    const {movies, isLoading, error, total, page, pageQty, notFind} = this.state;
    const elements = movies.map(item => {
      if (movies.length === 0) {
        return (
          <ErrorLoad />
        )
      }
      return (
        <li key={item.id} className='movie'>
          <Movie 
            path={item.poster_path}
            label={item.title}
            description={item.overview}
            date={item.release_date}
          />
        </li>
      )
    });

    const errorLoad = error ? <ErrorLoad /> : null;
    const spinner = isLoading ? <Spinner /> : null;
    const content = !isLoading ? [elements] : null;
    const noResults = notFind ? <ErrorFind /> : null;

    return (
      <div className='container'>
        <SearchMovies setQuery={this.setQuery}/> 
        <ul className='movie-list'>
          {errorLoad}
          {spinner}
          {content}
          {noResults}
        </ul>
        {!isLoading && pageQty !== 1 && total ?
          <Pagination 
            onChange={(num) => this.setPage(num)} 
            defaultCurrent={page} 
            total={total} 
            defaultPageSize={20} 
            showSizeChanger={false}
            style={{marginBottom: '18px'}}
          /> : null}
      </div>
    )
  }
}