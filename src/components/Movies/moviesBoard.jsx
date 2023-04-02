import React, { Component } from "react";
import { getMovies, deleteMovie } from "../../services/MovieService";
import ItemListContainer from "./ItemListContainer";
import Paging from "../common/paging";
import { paginate } from "../utils/paginate";
import ListGroup from "../common/listGroup";
import { getGenres } from "../../services/genreService";
// import { getGenres } from "../../services/fakeGenreService";
import { Link } from "react-router-dom";
import SearchBox from "../common/SearchBox";
import _ from "lodash";

class MovieBoard extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    search: "",
  };
  constructor() {
    super();
  }
  async componentDidMount() {
    // const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    const genres = await getGenres();
    const allGenres = [{ _id: "", name: "All Genres" }, ...genres];
    const movies = await getMovies();
    this.setState({ movies, genres: allGenres });
  }

  handleDelete = async (deleteId) => {
    const original = this.state.movies;
    const newMovie = this.state.movies.filter((movie) => movie._id !== deleteId);
    this.setState({ movies: newMovie });
    const success = await deleteMovie(deleteId);
    if (!success) this.setState({ movies: original });
  };
  handleLiked = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  getPages() {
    const { movies, pageSize } = this.state;
    return Math.ceil(movies / pageSize);
  }
  handlePageChange = (page) => {
    // console.log(page, "clicked");
    this.setState({ currentPage: page });
  };
  handleGenreChange = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, search: "" });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearchChange = (query) => {
    console.log(query);
    this.setState({ selectedGenre: "", search: query, currentPage: 1 });
  };
  getPageData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      search,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id == selectedGenre._id)
        : allMovies;

    const films = filtered.filter((m) => m.title.toLowerCase().startsWith(search.toLowerCase()));

    const sorted = _.orderBy(films, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: sorted.length, data: movies };
  };
  render() {
    const { currentPage, pageSize, genres: allGenres, sortColumn, search } = this.state;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup
              genres={allGenres}
              onItemSelect={this.handleGenreChange}
              selectedItem={this.state.selectedGenre}
            />
          </div>
          <div className="col">
            <Link to="/movies/new" className="btn btn-primary" style={{ marginBottom: 20 }}>
              New Movie
            </Link>
            <SearchBox value={search} onChange={this.handleSearchChange} />
            <ItemListContainer
              totalCount={totalCount}
              movies={movies}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onLiked={this.handleLiked}
              onSort={this.handleSort}
            ></ItemListContainer>
            <Paging
              itemCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onClick={this.handlePageChange}
            />
            {/* </main> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieBoard;
