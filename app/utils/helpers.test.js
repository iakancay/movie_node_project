import { isUselessInfo, isValid } from "./helpers.js";

const testMovies = [
  {
    title: "Test_Title",
    director: "Test_Director",
  },
  {
    director: "Test_Director",
    release_date: "Test_Date",
  },
  {
    title: "Test_Title",
    release_date: "Test_Date",
  },
  {
    title: "Test_Title",
    director: "Test_Director",
    release_date: "Test_Date",
    extraData: "Test_Extra",
  },
  {
    title: "Test_Title",
    director: "Test_Director",
    release_date: "Test_Date",
  },
];

describe("isValid function", () => {
  test("All missing movie information should return false", () => {
    expect(isValid(testMovies[0])).toBeFalsy();
    expect(isValid(testMovies[1])).toBeFalsy();
    expect(isValid(testMovies[2])).toBeFalsy();
  });
  test("should return true for valid movie information", () => {
    expect(isValid(testMovies[4])).toBeTruthy();
  });
});

describe("isUselessInfo function", () => {
  test("Extra  movie data should return false", () => {
    expect(isUselessInfo(testMovies[3])).toBeFalsy;
  });
  test("should return true for valid movie information", () => {
    expect(isUselessInfo(testMovies[4])).toBeTruthy();
  });
});
