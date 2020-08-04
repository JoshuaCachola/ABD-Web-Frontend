import api from "../utils";

const SET_SPOT_POSTS = "abd/skateSpotPosts/SET_SPOT_DETAILS";
const TOGGLE_POST = "abd/skateSpotPosts/TOGGLE_POST";
const GET_FOLLOWED_SKATE_SPOTS = "abd/skateSpotPosts/GET_FOLLOWED_SKATE_SPOTS";

export const setSpotPosts = (posts) => {
  return {
    type: SET_SPOT_POSTS,
    posts,
  };
};

export const showPost = (isShowPost) => {
  return {
    type: TOGGLE_POST,
    isShowPost,
  };
};

export const followedSkateSpots = (skateSpots) => {
  return {
    type: GET_FOLLOWED_SKATE_SPOTS,
    skateSpots,
  };
};

export const getSpotPosts = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${api.url}/skatespots/${id}/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
      },
    });

    if (!res.ok) {
      throw res;
    }

    const posts = await res.json();

    dispatch(setSpotPosts(posts));
  } catch (err) {
    console.error(err);
  }
};

export const isShowPost = (toggle) => (dispatch) => {
  dispatch(showPost(!toggle));
};

export const getFollowedSkateSpots = (skaterId) => async (dispatch) => {
  try {
    let res = await fetch(
      `{api.url}/skatespots/${skaterId}/followed-skate-spots`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
        },
      }
    );

    if (!res.ok) {
      throw res;
    }

    res = await res.json();

    dispatch(followedSkateSpots(res));
  } catch (err) {
    console.error(err);
  }
};

export default function reducer(
  state = { posts: [], isShowingPost: false, postDetails: {} },
  action
) {
  switch (action.type) {
    case SET_SPOT_POSTS: {
      return {
        ...state,
        posts: action.posts,
      };
    }
    case TOGGLE_POST: {
      return {
        ...state,
        isShowingPost: action.isShowPost,
      };
    }
    case GET_FOLLOWED_SKATE_SPOTS: {
      return {
        ...state,
        getFollowedSkateSpots: action.skateSpots,
      };
    }
    default:
      return state;
  }
}
