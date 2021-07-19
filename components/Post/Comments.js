import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import theme from "../theme";
import { comment, uncomment } from "../../store/actions/postActions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  listItem: {
    width: "fit-content",
    margin: "10px 0px",
    borderRadius: "15px",
    background: "rgba( 255, 255, 255, 0.25 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
  },
  text: {
    color: theme.palette.text.secondary,
  },
  addCommentBox: {
    display: "flex",
    alignItems: "center",
  },
}));

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

const Comments = ({ comments, postId }) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { currentUserDetails } = useSelector(
    (state) => state.getCurrentUserDetails,
  );

  const handleChange = (event) => {
    setText(event.target.value);
  };
  const addComment = (event) => {
    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();
      dispatch(comment(currentUserDetails._id, postId, text));
      setText("");
    }
  };

  const deleteComment = (comment) => (event) => {
    dispatch(uncomment(postId, comment._id));
  };
  return (
    <>
      <div className={classes.addCommentBox}>
        <Avatar
          alt="Avatar Picture"
          src={`../../dist/img/users/${currentUserDetails.photo}`}
        />
        <Input
          label="Text something..."
          variant="outlined"
          onKeyDown={addComment}
          onChange={handleChange}
          value={text}
        />
      </div>
      <List className={classes.root}>
        {comments &&
          comments.map((comment) => (
            <ListItem
              alignItems="flex-start"
              className={classes.listItem}
              key={comment._id}
            >
              <ListItemAvatar>
                <Avatar
                  alt="Avatar Picture"
                  src={`../../dist/img/users/${comment.postedBy.photo}`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={comment.postedBy.name}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.text}
                      color="textPrimary"
                    >
                      {comment.text}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default Comments;
