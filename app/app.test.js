import app from "./app.js";
import request from "supertest";
import { movies } from "./model/movies-data.js";

describe("GET /movies", () => {
  test("Should return movies", async () => {
    const response = await request(app).get("/movies");

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
  });
});

describe("POST /movies", () => {
  test("Movie {title,director,release_date} is necessary", async () => {
    const response = await request(app)
      .post("/movies")
      .send({ director: "Test_Director", release_date: "Test_Date" });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      msg: "Please send all movie information!",
    });
  });

  test("Extra data is not acceptable", async () => {
    const response = await request(app).post("/movies").send({
      title: "Test_Title",
      director: "Test_Director",
      release_date: "Test_Date",
      extraData: "Test_Extra",
    });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      msg: "Please don't send any information except {title,director,release_date}!",
    });
  });

  test("New movie should create", async () => {
    const response = await request(app).post("/movies").send({
      title: "Test_Title",
      director: "Test_Director",
      release_date: "Test_Date",
    });
    expect(response.status).toBe(201);
  });
});

describe("GET /movies/:id", () => {
  test("Should return single movie", async () => {
    const response = await request(app).get(`/movies/3`);
    expect(response.status).toBe(200);
  });
  test("Should give error if movie does not exist", async () => {
    const response = await request(app).get(`/movies/2ab`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      msg: "Movie with id=2ab is not exist!",
    });
  });
});

describe("PUT /movies/:id", () => {
  test("Should update movie", async () => {
    const response = await request(app).put(`/movies/3`).send({
      title: "Test_Title",
      director: "Test_Director",
      release_date: "Test_Date",
    });
    expect(response.status).toBe(200);
  });
  test("Should give error if movie does not exist", async () => {
    const response = await request(app).put(`/movies/2ab`).send({
      title: "Test_Title",
      director: "Test_Director",
      release_date: "Test_Date",
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      msg: "Movie with id=2ab is not exist!",
    });
  });
});

describe("Patch /movies/:id", () => {
  test("Should change movie data", async () => {
    const response = await request(app).patch(`/movies/3`).send({
      title: "Test_Title",
    });
    expect(response.status).toBe(200);
  });
  test("Should give error if movie does not exist", async () => {
    const response = await request(app).patch(`/movies/2ab`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      msg: "Movie with id=2ab is not exist!",
    });
  });
});

describe("DELETE /movies/:id", () => {
  test("Should delete movie", async () => {
    const response = await request(app).delete(`/movies/4`);
    expect(response.status).toBe(200);
    const isExist = movies.some((movie) => movie.id === "4");
    expect(isExist).toBe(false);
  });
  test("Should give error if movie does not exist", async () => {
    const response = await request(app).delete(`/movies/2ab`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      msg: "Movie with id=2ab is not exist!",
    });
  });
});
