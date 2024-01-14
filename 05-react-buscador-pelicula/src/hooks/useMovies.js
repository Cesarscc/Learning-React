import { useRef, useState, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const previousSearch = useRef(search);

  //useCallback para funciones, usa useMemo
  const getMovies = useCallback(async ({ search }) => {
    //evitar actualizar si busca lo mismo
    if (search === previousSearch.current) return;
    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      //se ejecuta en try y catch
      setLoading(false);
    }
  }, []);

  //Mantiene en memoria lo que ya ha buscado,
  //las dependencias de cambio son sort y movies
  //no depende del search
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading, error };
}
