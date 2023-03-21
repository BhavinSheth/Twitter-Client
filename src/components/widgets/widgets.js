import React from "react";
import "./widgets.css";
import {
  TwitterTimeLineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
  TwitterTimelineEmbed,
} from "react-twitter-embed";
import { Search } from "@material-ui/icons";

function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets-input">
        <Search className="widgets-search" />
        <input type="text" placeholder="Search Twitter" />
      </div>

      <div className="widget-container">
        <h4>what's happening?</h4>
        <TwitterTweetEmbed
          tweetId={"858551177860055040"}
          className="whats"
          theme="dark"
        />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="BhavinSheth67"
          options={{ height: 400 }}
          className="thread"
        />
      </div>
    </div>
  );
}

export default Widgets;
