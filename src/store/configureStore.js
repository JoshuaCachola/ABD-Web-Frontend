import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from "redux";
import thunk from "redux-thunk";

// Reducers
import authentication from "./authentication";
import skateSpotFeed from "./skateSpots";
import skateSpotPosts from "./skateSpotPosts";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  authentication,
  skateSpotFeed,
  skateSpotPosts
});

const configureStore = initialState => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;
