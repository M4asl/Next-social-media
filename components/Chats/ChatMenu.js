import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GroupIcon from "@material-ui/icons/Group";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import { Autocomplete } from "@material-ui/lab";
import { Popper, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import ChatSearch from "./ChatSearch";

const useStyles = makeStyles((theme) => ({
  container: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.secondary,
    // height: "15%",
  },
  search: {
    display: "flex",
    borderRadius: theme.shape.borderRadius,
    margin: "8px",
    width: "100%",
    borderRadius: "15px",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
  },
  inputRoot: {
    color: theme.palette.text.gray,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  field: {
    background: "#141414",
    width: "100%",
  },
  userItem: {
    background: "#000",
    color: "white",
  },
  listbox: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
}));

const ChatMenu = () => {
  const classes = useStyles();
  const { userReducer } = useSelector((state) => state);
  const [users, setUsers] = useState(userReducer.users);
  return (
    <Grid
      container
      className={classes.container}
      justify="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography
          color="textPrimary"
          variant="h4"
          style={{ padding: "8px" }}
        >
          Chats
        </Typography>
      </Grid>
      <Grid item>
        <IconButton>
          <GroupIcon
            style={{
              color: "#BFBFBF",
              fontSize: "2rem",
            }}
          />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <div
          className={classes.search}
          style={{ justifyContent: "space-between" }}
        >
          <ChatSearch users={users} />
        </div>
      </Grid>
    </Grid>
  );
};

export default ChatMenu;
