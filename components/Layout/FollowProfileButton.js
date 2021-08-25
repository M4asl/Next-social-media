import React from "react";
import Button from "@material-ui/core/Button";
import { follow, unfollow } from "../../store/actions/userActions";

export default function FollowProfileButton({
  onButtonClick,
  following,
}) {
  const followClick = () => {
    onButtonClick(follow);
  };
  const unfollowClick = () => {
    onButtonClick(unfollow);
  };
  return (
    <div style={{ width: "50%" }}>
      {following ? (
        <Button
          variant="outlined"
          color="secondary"
          onClick={unfollowClick}
          style={{ width: "100%" }}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          onClick={followClick}
          style={{ width: "100%" }}
        >
          Follow
        </Button>
      )}
    </div>
  );
}
