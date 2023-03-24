import { Component } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'

import './SearchMovies.css'

export default class SearchMovies extends Component {
  static propTypes = {
    setQuery: PropTypes.func,
  }

  onInputChange = debounce((e) => {
    if (e.target.value.trim() === '') {
      this.props.setQuery('')
      return
    }
    this.props.setQuery(e.target.value)
  }, 700)

  render() {
    return (
      <div className="search-movies">
        <input
          className="search-movies__input"
          type="text"
          onInput={this.onInputChange}
          placeholder="Type to search..."
        />
      </div>
    )
  }
}
