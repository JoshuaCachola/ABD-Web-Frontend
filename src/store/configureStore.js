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
import skateSpotDetails from "./skateSpotDetails";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  authentication,
  skateSpotFeed,
  skateSpotDetails
});

const configureStore = initialState => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;
