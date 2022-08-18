import express from "express";
import {
  changeMovieInfo,
  deleteMovie,
  getMovie,
  getMovies,
  saveMovie,
  updateMovie,
} from "../controllers/movies.js";
const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/", saveMovie);
router.put("/:id", updateMovie);
router.patch("/:id", changeMovieInfo);
router.delete("/:id", deleteMovie);

export default router;
