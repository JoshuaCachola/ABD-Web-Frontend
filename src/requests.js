import { FOLLOW, TOKEN_KEY, UNFOLLOW } from "./constants";
import api from "./utils";

/**
 *
 * @param {Number} postId
 * @param {String} type
 * @return {Boolean} Returns true if res.ok and false if not
 */
export const handleTapPost = async (postId, type) => {
  try {
    const authToken = localStorage.getItem("TOKEN_KEY");
    let res;
    if (type === "tap") {
      res = await fetch(`${api.url}/api/v1/skateposts/${postId}/boardtap`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
    } else {
      res = await fetch(`${api.url}/api/v1/skateposts/${postId}/boardtap`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    if (!res.ok) {
      throw res;
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 *
 * @param {Number} skateSpotId
 * @param {String} type
 * @return {Boolean} Returns true if res.ok and false if not
 */
export const handleFollowSkateSpot = async (skateSpotId, type) => {
  try {
    let res;
    if (type === FOLLOW) {
      res = await fetch(`${api.url}/api/v1/skatespots/${skateSpotId}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      });
    } else if (type === UNFOLLOW) {
      res = await fetch(
        `${api.url}/api/v1/skatespots/${skateSpotId}/unfollow`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          },
        }
      );
    }

    if (!res.ok) {
      throw res;
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
