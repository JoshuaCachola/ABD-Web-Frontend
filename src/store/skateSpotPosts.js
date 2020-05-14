import { apiBaseUrl } from "../config";

const SET_SPOT_POSTS = "abd/skateSpotDetails/SET_SPOT_DETAILS";

export const setSpotPosts = posts => {
  return {
    type: SET_SPOT_POSTS,
    posts,
  };
};

export const getSpotPosts = (id) => async dispatch =>{
  try {
    const res = await fetch(`${apiBaseUrl}/skatespots/${id}/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`
      }
    });

    if (!res.ok) throw res;

    const { posts } = await res.json();
    dispatch(setSpotPosts(posts))
  } catch (err) {
    console.error(err);
  }
};

export default function reducer(state = {posts: []}, action) {
  switch (action.type) {
    case SET_SPOT_POSTS: {
      return {
        ...state,
        posts: action.posts
      };
    }
    default: return state;
  }
};