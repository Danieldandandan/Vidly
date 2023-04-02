import React, { Component } from "react";
import Form from "../common/form";
import { getMovie, saveMovie } from "../../services/MovieService";
import _ from "lodash";
import { getGenres } from "../../services/genreService";

import Joi from "joi-browser";
class MovieDetail extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };
  async componentDidMount() {
    const genres = await getGenres();
    this.setState({ genres });

    const { id } = this.props.match.params;
    if (id === "new") return;
    const movie = await getMovie(id);
    if (!movie) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().min(5).label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().integer().min(0).max(100).required().label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };
  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  dropBar = (name, value, onChange) => {
    const genres = this.state.genres;
    return (
      <div class="input-group mb-3">
        <select className="custom-select" key={"select" + name} name={name} onChange={onChange}>
          <option selected>{value}</option>
          {genres.map((genre) => (
            <option key={`id + ${genre._id}`} value={genre}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    );
  };
  render() {
    const { id } = this.props.match.params;
    const { data, genres } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4 mx-auto">
            <h1> Movie Form </h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("title", "Title")}
              {this.renderSelect("genreId", "Genre", genres)}
              {this.renderInput("numberInStock", "Number in Stock")}
              {this.renderInput("dailyRentalRate", "Rate")}
              {this.renderButton("Save")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetail;
