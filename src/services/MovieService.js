import http from "./httpService";
import config from "../config.json";
import { toast } from "react-toastify";
const movies = [];

export async function getMovies() {
  try {
    const { data: movies } = await http.get(config.apiEndpoint + "movies");
    // throw new Error("abcs");
    return movies;
  } catch (ex) {
    console.log(ex);
    toast.error("unexpect error");
  }
  console.log(movies);
  return [];
}

export async function getMovie(id) {
  try {
    const { data: movies } = await http.get(config.apiEndpoint + "movies/" + id);
    return movies;
  } catch (ex) {
    console.log(ex);
    toast.error("Movie not found");
  }
  return null;
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(config.apiEndpoint + "movies/" + movie._id, body);
  }
  try {
    const { data: movies } = await http.post(config.apiEndpoint + "movies", movie);
    return movies;
  } catch (ex) {
    console.log(ex);
    toast.error("This movie can not be saved");
  }
  return null;
}

export async function deleteMovie(id) {
  try {
    await http.delete(config.apiEndpoint + "movies/" + id);
  } catch (error) {
    console.log("here", error);
    if (error.response && error.response.status == 404) toast.error("already deleted this movie");
    return false;
  }
  return true;
}
