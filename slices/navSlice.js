import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

//* Set Initial State
const initialState = {
    origin: null,
    destination: null,
    home: null,
    work: null,
    travelTimeInformation: null
};

//* Use Redux in-built createSlice to access and retrieve data from the store
export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setHome: (state, action) => {
            state.home = action.payload;
        },
        setWork: (state, action) => {
            state.work = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
    }
});

//* Export createSlice Action Creators
export const { setOrigin, setDestination, setHome, setWork, setTravelTimeInformation } = navSlice.actions;


//* Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectHome = (state) => state.nav.home;
export const selectWork = (state) => state.nav.work;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;

export default navSlice.reducer;