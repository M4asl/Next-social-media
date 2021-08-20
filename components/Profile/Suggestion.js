import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "48vh",
    zIndex: 100,
    position: "sticky",
    top: "50%",
    left: "6%",
    color: "#141414",
    borderRadius: "15px",
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 2px 12px 0 rgba( 255, 255, 255, 0.2 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    padding: "8px",
    overflowY: "scroll",
  },
  backgroundChat: {
    background: theme.palette.background.secondary,
    borderRadius: "15px",
  },
}));

export default function Suggestion({ userReducer }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {userReducer.usersToFollow.length > 0
        ? userReducer.usersToFollow.map((user) => (
            <List key={user._id}>
              <ListItem className={classes.backgroundChat}>
                <ListItemAvatar>
                  <Avatar
                    alt="Avatar Picture"
                    src={`../../dist/img/users/${user.photo}`}
                  />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
              </ListItem>
            </List>
          ))
        : "No users"}
    </Card>
  );
}
