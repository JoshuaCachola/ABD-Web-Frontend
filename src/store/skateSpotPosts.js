import api from "../utils";

const SET_SPOT_POSTS = "abd/skateSpotPosts/SET_SPOT_DETAILS";
const TOGGLE_POST = "abd/skateSpotPosts/TOGGLE_POST";
// const SET_SPOT_DETAILS = "abd/skateSpotPosts/SET_SPOT_DETAILS";

export const setSpotPosts = posts => {
  return {
    type: SET_SPOT_POSTS,
    posts,
  };
};

export const showPost = (isShowPost) => {
  return {
    type: TOGGLE_POST,
    isShowPost
  };
};

// export const setSpotDetails = (postDetails) => {
//   return {
//     type: SET_SPOT_DETAILS,
//     postDetails
//   };  
// };

export const getSpotPosts = (id) => async dispatch =>{
  try {
    const res = await fetch(`${api.url}/skatespots/${id}/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`
      }
    });

    if (!res.ok) throw res;

    const posts = await res.json();
    
    dispatch(setSpotPosts(posts))
  } catch (err) {
    console.error(err);
  }
};

export const isShowPost = toggle => dispatch => {
  dispatch(showPost(!toggle));
};

// export const getPostDetails = (post) => dispatch => {
//   console.log(post)
//   dispatch(setSpotDetails(post));
// };

export default function reducer(
  state = {posts: [], isShowingPost: false, postDetails: {}}, 
  action ) {
  switch (action.type) {
    case SET_SPOT_POSTS: {
      return {
        ...state,
        posts: action.posts
      };
    }
    case TOGGLE_POST: {
      return {
        ...state,
        isShowingPost: action.isShowPost
      };
    }
    // case SET_SPOT_DETAILS: {
    //   return {
    //     ...state,
    //     postDetails: action.postDetails
    //   };
    // }
    default: return state;
  }
};