import { createSlice, PayloadAction, } from "@reduxjs/toolkit";

export interface Movie {
    id: string,
    title: string,
    poster: string,
    rated: string,
    imdbRating: string,
    genre: string,
}

interface MovieState  {
    nominations: Movie[]
}
const initialState:MovieState = { nominations: [] }


const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        addMovie: (state, action:PayloadAction<Movie>) => {
            state.nominations.push(action.payload)
        },
        removeMovie: (state, action:PayloadAction<string>) => {
            state.nominations = state.nominations.filter(movie => movie.id !== action.payload)
        },
        restart: (state) => {
        state.nominations = []
        }
    },
})

export const { addMovie, removeMovie,restart } = movieSlice.actions;
export default movieSlice.reducer;