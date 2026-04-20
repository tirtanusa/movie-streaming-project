import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.BEARER_KEY_TMDB}`,
    "Content-Type": "application/json",
  },
});

export default tmdb;
