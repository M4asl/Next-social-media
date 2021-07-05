import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GroupIcon from "@material-ui/icons/Group";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  container: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.secondary,
    height: "15%",
  },
  search: {
    display: "flex",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
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
}));

const ChatMenu = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.container}
      justify="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography color="textPrimary" variant="h4" style={{ padding: "8px" }}>
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
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ChatMenu;
