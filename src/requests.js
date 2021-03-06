import { TOKEN_KEY, FOLLOW } from "./constants";
import api from "./utils";

/**
 *
 * @param {Number} postId
 * @param {String} type
 * @return {Boolean} Returns true if res.ok and false if not
 */
export const handleTapPost = async (postId, type) => {
  try {
    const authToken = localStorage.getItem(TOKEN_KEY);
    let res;
    if (type === "tap") {
      res = await fetch(`${api.url}/api/v1/skateposts/${postId}/boardtap`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
    } else if (type === "untap") {
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
 * @param {Number} skateSpotId
 * @param {String} type
 * @return {Boolean} Returns true if res.ok and false if not
 */
export const handleToggleFollow = async (skateSpotId, type) => {
  try {
    const res = await fetch(
      `${api.url}/api/v1/skatespots/${skateSpotId}/${
        type === FOLLOW ? "follow" : "unfollow"
      }`,
      {
        method: type,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      }
    );

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
 * @return {Array} - Returns skaters followed skatespots
 */
export const getFollowedSpots = async () => {
  try {
    const res = await fetch(`${api.url}/api/v1/skatespots/following`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    });

    if (!res.ok) {
      throw res;
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

/**
 * @param {String} chatRoomName
 * @return {Array} - Return an array of message objects
 */
export const getChatRoomMessages = async (chatRoomName) => {
  const res = await fetch(`${api.url}/api/v1/chat/messages/${chatRoomName}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    },
  });

  return await res.json();
};

/**
 * @return {Number} - Number of followed skate spots
 */
export const getFollowedSpotsCount = async () => {
  const res = await fetch(`${api.url}/api/v1/skatespots/followed-spots-count`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    },
  });

  const { count } = await res.json();
  return count;
};

/**
 * @return {Array} - Array of the users posts
 */
export const getSkaterPosts = async () => {
  try {
    const res = await fetch(`${api.url}/api/v1/skateposts/my-posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    });

    if (!res.ok) {
      throw res;
    }

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
