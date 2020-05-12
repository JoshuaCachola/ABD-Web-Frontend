import React, { useState, useEffect } from "react";
import videojs from "video.js";

const SkateSpotPost = (props) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (!player) {
      setPlayer(videojs())
    }
  });

  return (
    <>
      <h1>Skate Spot Post</h1>
      <div>
        <div data-vjs-player>
          <video>{}</video>
        </div>
      </div>
    </>
  );
};

export default SkateSpotPost;
