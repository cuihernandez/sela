/* eslint-disable prettier/prettier */
import {combineReducers, createStore} from 'redux';
import userReducer from './reducers/userReducer';
import transactionReducer from './reducers/transactionReducer';
import psalmsReducer from './reducers/psalmsReducer';
import pearlsReducer from './reducers/pearlsReducers';
import patientsReducer from './reducers/patientsReducer';
// import your individual reducers here
const rootReducer = combineReducers({
  user: userReducer,
  transaction: transactionReducer,
  psalms: psalmsReducer,
  pearls: pearlsReducer,
  patients: patientsReducer,
  // add your individual reducers here
});

const store = createStore(rootReducer);

export default store;
