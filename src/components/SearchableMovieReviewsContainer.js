import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'your-key-here';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

class SearchAbleMovieReviewsContainer extends React.Component {
  state = {
    reviews: [],
    searchTerm: ''
  }

  handleChange = event => {
    this.setState({ searchTerm: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch(URL.concat(this.state.searchTerm))
      .then(resp => resp.json())
      .then((movieData) => {
        this.setState({ reviews: movieData.results })
      })
  }

  render() {
    return (
      <div className="searchable-movie-reviews">
        <form onSubmit={this.handleSubmit}>
          <label>Search Reviews</label>
          <input type="text" onChange={this.handleChange}></input>
          <button>Submit</button>
        </form>

        <MovieReviews reviews={this.state.reviews} />
      </div>
    )
  }

}

export default SearchAbleMovieReviewsContainer;
