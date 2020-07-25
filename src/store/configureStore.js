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
import skaterMessages from "./skaterMessages";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  authentication,
  skateSpotFeed,
  skateSpotPosts,
  skaterMessages
});

const configureStore = initialState => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;
