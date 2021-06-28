import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("allMovies")) || {
    netflixOriginals: [],
    trending: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentaries: []
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        updateNetflixOriginals: (state, action) => {
            state.netflixOriginals = action.payload;
        },
        updateTrending: (state, action) => {
            state.trending = action.payload;
        },
        updateTopRated: (state, action) => {
            state.topRated = action.payload;
        },
        updateAction: (state, action) => {
            state.action = action.payload;
        },
        updateComedy: (state, action) => {
            state.comedy = action.payload;
        },
        updateHorror: (state, action) => {
            state.horror = action.payload;
        },
        updateRomance: (state, action) => {
            state.romance = action.payload;
        },
        updateDocumentaries: (state, action) => {
            state.documentaries = action.payload;
        },
        setAll: (state, action) => {
            state = action.payload;
        },
        deleteAll: (state) => {
            state = initialState
        },
        setLocalStorage: (state) => {
            console.log('inside setloaal')
            localStorage.setItem('allMovies', JSON.stringify(state));
        }

    }
})

export const moviesActions = moviesSlice.actions;

export default moviesSlice.reducer;