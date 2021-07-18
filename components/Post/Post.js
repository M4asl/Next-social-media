import React from "react";
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
import TextField from "@material-ui/core/TextField";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Moment from "react-moment";
import theme from "../theme";

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
  addCommentBox: {
    display: "flex",
    alignItems: "center",
  },
}));

const PostHeader = withStyles({
  root: {
    "& .MuiCardHeader-content": {
      display: "flex",
      justifyContent: "space-between",
    },
  },
})(CardHeader);

const Input = withStyles({
  root: {
    width: "100%",
    borderRadius: "15px",
    borderColor: theme.palette.background.paper,
    marginLeft: "10px",
    "& label": {
      color: theme.palette.text.primary,
    },
    "& label.Mui-focused": {
      color: theme.palette.text.primary,
      fontWeight: "700",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
        borderRadius: "15px",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.text.primary,
        borderRadius: "15px",
      },
    },
  },
})(TextField);

const Post = ({ post }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.backgroundPost}>
        <PostHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          title={post.postedBy.name}
          subheader={
            <Moment fromNow style={{ color: "#BFBFBF" }}>
              {post.created}
            </Moment>
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
          <Button variant="outlined" color="secondary">
            <FavoriteBorderIcon />
          </Button>
          <Button variant="outlined" color="primary">
            <ChatBubbleOutlineIcon />
          </Button>
        </div>
        <div className={classes.addCommentBox}>
          <Avatar>R</Avatar>
          <Input label="Text something..." variant="outlined" />
        </div>
      </Card>
    </div>
  );
};

export default Post;
