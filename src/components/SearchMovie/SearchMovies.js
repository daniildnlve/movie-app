import { Component } from "react";
import { debounce } from "lodash";

import './SearchMovies.css';

export default class SearchMovies extends Component {

  onInputChange = debounce((e) => {
    if (e.target.value.trim() === "") {
      this.props.setQuery('');
      return
    }
    this.props.setQuery(e.target.value);
  }, 700)

  render() {

    return(
      <div className="search-movies">
        <input className="search-movies__input" type='text' onInput={this.onInputChange} placeholder="Type to search..."/>
      </div>
    )
  }
}