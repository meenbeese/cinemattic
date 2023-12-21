import { createContext, useState, useEffect } from "react";
import SECRET from "../utilities/Secret";

// Default country is Canada
const COUNTRY = "CA";

const Contextpage = createContext();

export const MovieProvider = ({ children }) => {
  const [header, setHeader] = useState("Trending");
  const [totalPage, setTotalPage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [page, setPage] = useState(1);
  const [activegenre, setActiveGenre] = useState(28);
  const [genres, setGenres] = useState([]);
  const [loader, setLoader] = useState(true);
  const [backgenre, setBackGenre] = useState(false);

  useEffect(() => {
    if (page < 1) {
      setPage(1);
    }
  }, [page]);

  const filteredGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${activegenre}&api_key=${SECRET.API_KEY}&with_origin_country=${COUNTRY}&page=${page}`,
    );
    const filteredGenre = await data.json();
    setMovies(movies.concat(filteredGenre.results));
    setTotalPage(filteredGenre.total_pages);
    setLoader(false);
    setHeader("Genres");
  };

  const fetchSearch = async (query) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${SECRET.API_KEY}&with_origin_country=${COUNTRY}&language=en-US&query=${query}&page=1&include_adult=false`,
    );
    const searchmovies = await data.json();
    setSearchedMovies(searchmovies.results);
    setLoader(false);
    setHeader(`Results for "${query}"`);
  };

  const fetchGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${SECRET.API_KEY}&with_origin_country=${COUNTRY}&language=en-US`,
    );
    const gen = await data.json();
    setGenres(gen.genres);
  };

  const fetchTrending = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${SECRET.API_KEY}&with_origin_country=${COUNTRY}&page=${page}`,
    );
    const trend = await data.json();
    setTrending(trending.concat(trend.results));
    setTotalPage(trend.total_pages);
    setLoader(false);
    setHeader("Trending");
  };

  const fetchUpcoming = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${SECRET.API_KEY}&with_origin_country=${COUNTRY}&language=en-US&page=${page}`,
    );
    const upc = await data.json();
    setUpcoming(upcoming.concat(upc.results));
    setTotalPage(upc.total_pages);
    setLoader(false);
    setHeader("Upcoming");
  };

  const GetFavorite = () => {
    setLoader(false);
    setHeader("Favorites");
  };

  return (
    <Contextpage.Provider
      value={{
        fetchGenre,
        genres,
        setGenres,
        filteredGenre,
        header,
        setHeader,
        movies,
        setMovies,
        page,
        setPage,
        activegenre,
        setActiveGenre,
        fetchSearch,
        loader,
        setBackGenre,
        backgenre,
        setLoader,
        fetchTrending,
        trending,
        fetchUpcoming,
        upcoming,
        GetFavorite,
        totalPage,
        searchedMovies,
      }}
    >
      {children}
    </Contextpage.Provider>
  );
};

export default Contextpage;
