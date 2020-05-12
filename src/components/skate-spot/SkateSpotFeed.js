import React from "react";
import SkateSpotPost from "./SkateSpotPost";

const SkateSpotFeed = (props) => {
  return (
    <div className="skate-spot__feed">
      {props.posts.map(post => {
        return (
          <SkateSpotPost post={post} />
        );
      })}
    </div>
  );
};

export default SkateSpotFeed;