import { TOKEN_KEY } from "../constants";
import api from "../utils";

const SET_SPOT_POSTS = "abd/skateSpotPosts/SET_SPOT_DETAILS";
const GET_FOLLOWED_SKATE_POSTS = "abd/skateSpotPosts/GET_FOLLOWED_SKATE_POSTS";
const GET_NUMBER_OF_POSTS = "abd/skateSpotPosts/GET_NUMBER_OF_POSTS";
const SET_BOARD_TAPS = "abd/skateSpotPosts/SET_BOARD_TAPS";
const GET_BOARD_TAP = "abd/skateSpotPosts/GET_BOARD_TAP";

export const setSpotPosts = (posts) => {
  return {
    type: SET_SPOT_POSTS,
    posts,
  };
};

export const followedSkatePosts = (skatePosts) => {
  return {
    type: GET_FOLLOWED_SKATE_POSTS,
    skatePosts,
  };
};

export const getNumberOfPosts = (num) => {
  return {
    type: GET_NUMBER_OF_POSTS,
    num,
  };
};

export const setBoardTaps = (boardTaps) => {
  return {
    type: SET_BOARD_TAPS,
    boardTaps,
  };
};

export const getBoardTap = (boardTap) => {
  return {
    type: GET_BOARD_TAP,
    boardTap,
  };
};

export const getSpotPosts = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${api.url}/api/v1/skatespots/${id}/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    });

    if (!res.ok) {
      throw res;
    }

    const posts = await res.json();

    dispatch(setSpotPosts(posts));
    dispatch(getNumberOfPosts(posts.length));
  } catch (err) {
    console.error(err);
  }
};

export const getFollowedSkatePosts = (followedSkateSpots) => async (
  dispatch
) => {
  let followedFeed = [];
  try {
    followedSkateSpots.forEach(async (skateSpot, i) => {
      let res = await fetch(
        `${api.url}/api/v1/skatespots/${skateSpot.skateSpotId}/following`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          },
        }
      );

      if (!res.ok) {
        throw res;
      }

      res = await res.json();
      followedFeed = [...followedFeed, ...res];
      if (i === followedSkateSpots.length - 1) {
        dispatch(followedSkatePosts(followedFeed));
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export const handleSetBoardTaps = (boardTaps) => (dispatch) => {
  dispatch(setBoardTaps(boardTaps));
};

export const handleGetBoardTap = (boardTap) => (dispatch) => {
  dispatch(getBoardTap(boardTap));
};

export default function reducer(
  state = {
    posts: [],
    postDetails: {},
    num: 0,
    boardTaps: {},
    boardTap: false,
  },
  action
) {
  switch (action.type) {
    case SET_SPOT_POSTS: {
      return {
        ...state,
        posts: action.posts,
      };
    }
    case GET_FOLLOWED_SKATE_POSTS: {
      return {
        ...state,
        followedSkatePosts: action.skatePosts,
      };
    }
    case GET_NUMBER_OF_POSTS: {
      return {
        ...state,
        getNumberOfPosts: action.num,
      };
    }
    case SET_BOARD_TAPS: {
      return {
        ...state,
        setBoardTaps: action.boardTaps,
      };
    }
    case GET_BOARD_TAP: {
      return {
        ...state,
        getBoardTap: action.boardTap,
      };
    }
    default:
      return state;
  }
}
