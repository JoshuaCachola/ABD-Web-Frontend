import React, { useState } from "react";
import VideoPlayer from "react-video-js-player";

const SkateSpotPost = (props) => {
  // const [ player, setPlayer ] = useState({});

  // thread props from the SkateSpotFeed
  // replace with props.src and props.poster
  const [src, setSrc] = useState(
    "https://abd-bucket-dev.s3-us-west-1.amazonaws.com/dpgapbank.MP4"
  );
  const [poster, setPoster] = useState("");

  // const onPlayerReady = (player) => {
  //     console.log("Player is ready: ", player);
  //     setPlayer(player);
  // }

  // const onVideoPlay = (duration) => {
  //     console.log("Video played at: ", duration);
  // }

  // const onVideoPause = (duration) => {
  //     console.log("Video paused at: ", duration);
  // }

  // const onVideoTimeUpdate = (duration) => {
  //     console.log("Time updated: ", duration);
  // }

  // const onVideoSeeking = (duration) => {
  //     console.log("Video seeking: ", duration);
  // }

  // const onVideoSeeked = (from, to) => {
  //     console.log(`Video seeked from ${from} to ${to}`);
  // }

  // const onVideoEnd = () => {
  //     console.log("Video ended");
  // }

  return (
    <div>
      <VideoPlayer
        controls={true}
        src={src}
        poster={poster}
        width="720"
        height="420"
      // onReady={() => onPlayerReady()}
      // onPlay={() => onVideoPlay()}
      // onPause={() => onVideoPause()}
      // onTimeUpdate={() => onVideoTimeUpdate()}
      // onSeeking={() => onVideoSeeking()}
      // onSeeked={() => onVideoSeeked()}
      // onEnd={() => onVideoEnd()}
      />
    </div>
  );
};

export default SkateSpotPost;
