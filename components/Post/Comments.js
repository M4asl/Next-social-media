import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

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
}));

const Comments = ({ comments }) => {
  const classes = useStyles();

  return (
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
  );
};

export default Comments;
