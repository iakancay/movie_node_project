import express from "express";
import movieRouter from "./routes/movies.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("Welcome!");
});
app.use("/movies", movieRouter);

export default app;
