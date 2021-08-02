import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {
  likePost,
  unlikePost,
  removePost,
} from "../../store/actions/postActions";
import Comments from "./Comments";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    zIndex: 100,
    color: theme.palette.text.primary,
    fontWeight: "500",
    background: "rgba( 255, 255, 255, 0.25 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    minHeight: "300px",
    margin: "22px 0px",
    padding: "20px",
  },
  backgroundPost: {
    width: "100%",
    minHeight: "258px",
    background: theme.palette.background.secondary,
    borderRadius: "15px",
    padding: "10px",
  },
  divider: {
    height: "3px",
    backgroundColor: "#bfbfbf",
  },
  statisticsBox: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px 0px",
  },
}));

const PostHeader = withStyles({
  root: {
    padding: "16px 0px",
    "& .MuiCardHeader-content": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
})(CardHeader);

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const { userReducer, postReducer } = useSelector((state) => state);

  const clickLikeButton = (callApi) => {
    dispatch(callApi(post, userReducer.currentUserDetails));
    setLike(!like);
  };

  const clickLike = () => {
    clickLikeButton(likePost);
  };
  const clickUnlike = () => {
    clickLikeButton(unlikePost);
  };

  const checkLike = (post) => {
    const matchFollowers = post?.likes.some(
      (like) => like._id == userReducer.currentUserDetails._id,
    );
    return matchFollowers;
  };

  const deletePost = (postId) => (event) => {
    dispatch(removePost(postId));
  };

  useEffect(() => {
    if (
      post &&
      Object.keys(post).length === 0 &&
      post.constructor === Object
    ) {
      return true;
    }
    const like = checkLike(post);
    setLike(like);
  }, [post]);

  return (
    <div className={classes.root}>
      <Card className={classes.backgroundPost}>
        <PostHeader
          avatar={
            <Avatar
              alt="Avatar Picture"
              src={`../../dist/img/users/${post.postedBy.photo}`}
            />
          }
          title={post.postedBy.name}
          subheader={
            <>
              <Moment fromNow style={{ color: "#BFBFBF" }}>
                {post.created}
              </Moment>
              {userReducer.currentUserDetails._id ===
                post.postedBy._id && (
                <Button onClick={deletePost(post._id)}>
                  <DeleteOutlineIcon />
                </Button>
              )}
            </>
          }
        />
        <Divider className={classes.divider} />
        <CardContent>
          <Typography
            variant="body2"
            color="textPrimary"
            component="p"
          >
            {post.text}
          </Typography>
        </CardContent>
        <Divider className={classes.divider} />
        <div className={classes.statisticsBox}>
          <Typography variant="caption">
            {post.likes.length} likes
          </Typography>
          <Typography variant="caption">
            {post.comments.length} comments
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.buttonBox}>
          {like ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={clickUnlike}
            >
              <FavoriteBorderIcon />
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              onClick={clickLike}
            >
              <FavoriteBorderIcon />
            </Button>
          )}
          <Button variant="outlined" color="primary">
            <ChatBubbleOutlineIcon />
          </Button>
        </div>

        <Comments comments={post.comments} post={post} />
      </Card>
    </div>
  );
};

export default Post;
