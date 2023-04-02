import http from "./httpService";
import config from "../config.json";
import { toast } from "react-toastify";

export async function getGenres() {
  try {
    const { data: genres } = await http.get(config.apiEndpoint + "genres");
    return genres;
  } catch (error) {
    if (error.response && error.response.status == 404)
      toast.error("Server went wrong please try again later");
  }
  return [];
}
