import React, { Component } from "react";
import Heart from "../common/heart";
import Table from "../common/table";
import { Link } from "react-router-dom";

class ItemListContainer extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => <Link to={`/movies/${movie._id}`}> {movie.title}</Link>,
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => <Heart liked={movie.liked} onClick={() => this.props.onLiked(movie)} />,
    },
    {
      key: "delete",
      content: (movie) => (
        <button onClick={() => this.props.onDelete(movie._id)} className="btn btn-danger btn-sm ">
          Delete
        </button>
      ),
    },
  ];

  getMessage() {
    const message =
      this.props.movieCnt == 0 ? (
        <h1> NO Movies</h1>
      ) : (
        <h1>there are {this.props.totalCount} movies</h1>
      );
    return (
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            {message}
          </a>
        </div>
      </nav>
    );
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <div>
        {this.getMessage()}
        <Table columns={this.columns} data={movies} sortColumn={sortColumn} onSort={onSort} />
      </div>
    );
  }
}

export default ItemListContainer;
