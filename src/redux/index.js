import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // This will help us to support Promises in order to consume the backend
import usersReducer from './usersDuck';

/**
 * @author CosmicTiger
 * @description
 * we create an object reducer to have a single reducer that's going
 * to be the merge of all the reducers
 * @params Object
 * @returns Object
 */
const rootReducer = combineReducers({
    users: usersReducer,
})

// For debugging purposes
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * @author CosmicTiger
 * @description
 * analogous to createStore()
 * @returns Object <state>
 */
export default function generateStore() {
    // 3 pieces: reducer, initialState (my reducer already have it), middlewares
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}