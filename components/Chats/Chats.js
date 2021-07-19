import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backgroundChat: {
    background: theme.palette.background.secondary,
    borderRadius: "15px",
    margin: "12px 0px",
  },
}));

const Chat = () => {
  const classes = useStyles();
  return (
    <List>
      <ListItem className={classes.backgroundChat}>
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText primary="Mateusz Masłowiec" />
      </ListItem>
    </List>
  );
};

export default Chat;
