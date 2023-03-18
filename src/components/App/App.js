import { Component } from "react";
import MovieList from '../MovieList/MovieList';
import { Offline, Online } from "react-detect-offline";
import ErrorNetwork from '../Errors/ErrorNetwork';

import './App.css';

export default class App extends Component {

  state = {
    name: null
  }

  render() {
    
    return (
      <div>
        <Online><MovieList /></Online>
        <Offline><ErrorNetwork /></Offline>
      </div>
     )
  };
};