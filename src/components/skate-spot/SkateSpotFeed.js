import React from "react";
import VideoThumbnail from "react-video-thumbnail";
import SkateSpotPost from "./SkateSpotPost";
import { Link, Switch } from "react-router-dom";

const SkateSpotFeed = (props) => {
  return (
    <div className="skate-spot__feed">
      <Switch>
        {props.posts.map(post => {
          return (
            <Link to="/">
              <VideoThumbnail
                videoUrl={post.url}
                height={120}
                width={80}
              />
            </Link>
          );
        })}
      </Switch>
    </div>
  );
};

export default SkateSpotFeed;
