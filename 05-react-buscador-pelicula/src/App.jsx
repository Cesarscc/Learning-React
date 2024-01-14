import { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import debounce from "just-debounce-it";

/*
useRef Es un hook, que permite crear una referencia mutable
que persiste durante todo el ciclo de vida de tu componente
muy útil para guardar cualquier valor que puedas mutar, como
un identificador, un elemento del dom, un contador, y que 
cada vez que cambia no vuelve a renderizar el componente
*/

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError("No se puede buscar una película vacía");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una película con un número");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);

  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  /*   const counter = useRef(0); //Valor que persiste entre renders
  counter.current++;
  console.log(counter.current); */

  //const inputRef = useRef();
  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log("search", search);
      getMovies({ search });
    }, 350),
    [getMovies]
  );

  const handleSort = () => {
    setSort(!sort);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
    //No controlada atraves del dom
    //const { search } = Object.fromEntries(new window.FormData(event.target));
    //console.log("search", search);

    /* const inputEl = inputRef.current;
    const value = inputEl.value;
    console.log(value); */
  };

  const handleChange = (event) => {
    /* const newQuery = event.target.value;
    if (newQuery.startsWith(" ")) return; */
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            //ref={inputRef}
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            name="query"
            value={search}
            onChange={handleChange}
            placeholder="Avengers, Star Wars, The Matrix ..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>{loading ? <p>Cargando ...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
