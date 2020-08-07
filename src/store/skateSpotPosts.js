import api from "../utils";

const SET_SPOT_POSTS = "abd/skateSpotPosts/SET_SPOT_DETAILS";
const TOGGLE_POST = "abd/skateSpotPosts/TOGGLE_POST";
const GET_FOLLOWED_SKATE_POSTS = "abd/skateSpotPosts/GET_FOLLOWED_SKATE_POSTS";
const GET_NUMBER_OF_POSTS = "abd/skateSpotPosts/GET_NUMBER_OF_POSTS";

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

export const followedSkatePosts = (skatePosts) => {
  return {
    type: GET_FOLLOWED_SKATE_POSTS,
    skatePosts,
  };
};

export const getNumberOfPosts = num => {
  return {
    type: GET_NUMBER_OF_POSTS,
    num
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
    dispatch(getNumberOfPosts(posts.length));
  } catch (err) {
    console.error(err);
  }
};

export const isShowPost = (toggle) => (dispatch) => {
  dispatch(showPost(!toggle));
};

export const getFollowedSkatePosts = (followedSkateSpots) => async (
  dispatch
) => {
  let followedFeed = [];
  try {
    followedSkateSpots.forEach(async (skateSpot, i) => {
      let res = await fetch(
        `${api.url}/skatespots/following/${skateSpot.skateSpotId}`,
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
      followedFeed = [...followedFeed, ...res];
      if (i === followedSkateSpots.length - 1) {
        dispatch(followedSkatePosts(followedFeed));
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export default function reducer(
  state = { posts: [], isShowingPost: false, postDetails: {}, num: 0 },
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
    case GET_FOLLOWED_SKATE_POSTS: {
      return {
        ...state,
        followedSkatePosts: action.skatePosts,
      };
    }
    case GET_NUMBER_OF_POSTS: {
      return {
        ...state,
        getNumberOfPosts: action.num
      }
    }
    default:
      return state;
  }
}
