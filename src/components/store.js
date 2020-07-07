import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";

//Reducers manage data
const reducers = combineReducers({
    keplerGl: keplerGlReducer
});

//Store data. Kepler needs some middleware from redux to work.
const store = createStore(reducers, {}, applyMiddleware(taskMiddleware))

export default store;