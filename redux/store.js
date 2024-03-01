/* eslint-disable prettier/prettier */
import { combineReducers, createStore } from 'redux';
import userReducer from './reducers/userReducer';
// import your individual reducers here
const rootReducer = combineReducers({
    user: userReducer,
    // add your individual reducers here
});

const store = createStore(
    rootReducer,
);

export default store;
