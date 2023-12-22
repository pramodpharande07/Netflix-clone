import { 
    configureStore,
    createAsyncThunk,
    createSlice
     } from"@reduxjs/toolkit";
import axios from "axios";
// axios library, which is a popular HTTP client for making requests. This library will likely be used to make API requests to fetch or send data.
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";

     const initialState = {
        movies: [],
        genresLoaded: false,
        genres: [],
     };

     export const getGenres = createAsyncThunk("netflix/genres", async () => {
        const { 
            data: { genres }, 
            } = await axios.get(
            // `${TMDB_BASE_URL}/3/genre/movie/list?api_key=${API_KEY}`);
            "https://api.themoviedb.org/3/genre/movie/list?api_key=e1d81f1021c0573a2ac45893d51fd4f6");
        //    "https://api.themoviedb.org/3/movie/550?api_key=e1d81f1021c0573a2ac45893d51fd4f6");
            
         return genres;
     })

     const createArrayFromRawData = (array, moviesArray, genres) => {
        // console.log(array);
        array.forEach((movie) => {
          const movieGenres = [];
          movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) movieGenres.push(name.name);
          });
          if (movie.backdrop_path)
            moviesArray.push({
              id: movie.id,
              name: movie?.original_name ? movie.original_name : movie.original_title,
              image: movie.backdrop_path,
              genres: movieGenres.slice(0, 3),
            });
        });
      };
      
    //  const getRawData = async (api, genres, paging ) => {
    //     const moviesArray = [];
    //     for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    //       const {
    //         data: { results },
    //       } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    //       createArrayFromRawData(results, moviesArray, genres);
    //     }
    //     return moviesArray;
    //   };
     const getRawData = async (api, genres, paging = false) => {
        const moviesArray = [];
        for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
          const {
            data: { results },
          } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
          createArrayFromRawData(results, moviesArray, genres);
        }
        return moviesArray;
      };

    //   export const fetchDataByGenre = createAsyncThunk(
    //     "netflix/genre",
    //     async ({ genre, type }, thunkAPI) => {
    //       const {
    //         netflix: { genres },
    //       } = thunkAPI.getState();
    //       return getRawData(
    //         `https://api.themoviedb.org/3/discover/${type}?api_key=e1d81f1021c0573a2ac45893d51fd4f6&with_genres=${genre}`,
    //         genres
    //       );
    //     }
    //   );

      export const fetchMovies = createAsyncThunk(
        "netflix/trending",
        async ({ type }, thunkAPI) => {
          const {
            netflix: { genres },
          } = thunkAPI.getState();
        //    const data = getRawData();

        
          return getRawData(
            `${TMDB_BASE_URL}/3/trending/${type}/week?api_key=${API_KEY}`,
            // `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
            // `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
            // https://api.themoviedb.org/3/trending/all/week?api_key=YOUR_API_KEY&page=1

            genres,
            true
          );
        //   console.log(data);
        }
      );

     const NetflixSlice = createSlice({
        name: "Netflix",
        initialState,
        extraReducers: (builder) => {
            builder.addCase(getGenres.fulfilled, (state, action) => {
                state.genres = action.payload;
                state.genresLoaded = true;
            })
            
            builder.addCase(fetchMovies.fulfilled, (state, action) => {
                state.movies = action.payload;
               
            });
        },
    
    });

    export const store = configureStore({
        reducer: {
            netflix: NetflixSlice.reducer,
        },
    })