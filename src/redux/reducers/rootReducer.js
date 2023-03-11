import {combineReducers} from "redux";
import {entertainmentReducer} from "./entertainmentReducer";

export const rootReducer = combineReducers({
    entertainment: entertainmentReducer
});

