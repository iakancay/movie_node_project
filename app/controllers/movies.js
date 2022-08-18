import { isValid, isUselessInfo } from "../utils/helpers.js";
import { v4 as uuidv4 } from "uuid";
import { movies } from "../model/movies-data.js";

export const getMovies = (req, res) => {
  res.status(200).json(movies).end();
};
export const getMovie = (req, res) => {
  const searchedMovie = movies.find((movie) => movie.id === req.params.id);
  if (searchedMovie) {
    res.status(200).json(searchedMovie).end();
  } else {
    res
      .status(404)
      .json({ msg: `Movie with id=${req.params.id} is not exist!` })
      .end();
  }
};
export const saveMovie = (req, res) => {
  const newMovie = req.body;
  if (!isUselessInfo(newMovie)) {
    res.status(400).json({
      msg: "Please don't send any information except {title,director,release_date}!",
    });
  } else if (!isValid(newMovie)) {
    res.status(400).json({ msg: "Please send all movie information!" });
  } else {
    newMovie.id = uuidv4();
    movies.push(newMovie);
    res
      .status(201)
      .json({ msg: "New movie added successfully", newMovie: newMovie })
      .end();
  }
};

export const updateMovie = (req, res) => {
  const movieNewData = req.body;
  if (isValid(movieNewData)) {
    const movieToUpdate = movies.find((movie) => movie.id === req.params.id);
    if (!movieToUpdate) {
      res
        .status(404)
        .json({ msg: `Movie with id=${req.params.id} is not exist!` })
        .end();
    }
    movieToUpdate.title = movieNewData.title;
    movieToUpdate.director = movieNewData.director;
    movieToUpdate.release_date = movieNewData.release_date;
    res
      .status(200)
      .json({
        msg: `Movie with id=${req.params.id} updated successfully.`,
        movie: movieToUpdate,
      })
      .end();
  } else {
    res.status(400).json({ msg: "Please send all movie information!" });
  }
};
export const changeMovieInfo = (req, res) => {
  const movieToUpdate = movies.find((movie) => movie.id === req.params.id);
  if (movieToUpdate) {
    const { title, director, release_date } = req.body;
    if (title) movieToUpdate.title = title;
    if (director) movieToUpdate.director = director;
    if (release_date) movieToUpdate.release_date = release_date;
    res
      .status(200)
      .json({
        msg: `Movie with id=${req.params.id} updated successfully.`,
        movie: movieToUpdate,
      })
      .end();
  } else {
    res
      .status(404)
      .json({ msg: `Movie with id=${req.params.id} is not exist!` })
      .end();
  }
};
export const deleteMovie = (req, res) => {
  const movieToDelete = movies.find((movie) => movie.id === req.params.id);
  if (movieToDelete) {
    const indexOfDeletedMovie = movies.indexOf(movieToDelete);
    movies.splice(indexOfDeletedMovie, 1);
    res
      .status(200)
      .json({
        msg: `Movie with id=${req.params.id} deleted successfully.`,
        movies,
      })
      .end();
  } else {
    res
      .status(404)
      .json({ msg: `Movie with id=${req.params.id} is not exist!` })
      .end();
  }
};
