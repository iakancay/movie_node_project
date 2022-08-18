export const isValid = (movie) => {
  if (!movie.title || !movie.director || !movie.release_date) return false;
  return true;
};
export const isUselessInfo = (movie) => {
  const properties = Object.keys(movie);
  if (properties.length > 3) return false;
  return true;
};
