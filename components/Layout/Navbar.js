import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { Notifications } from "@material-ui/icons";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import { Avatar, ListItemAvatar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Link from "next/link";
import Loader from "./Loader";
import { GLOBAL_ALERT } from "../../store/constants/globalConstants";
import Error from "./Error";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    display: "flex",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    padding: "8px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchButton: {
    padding: theme.spacing(0, 2),
    pointerEvents: "pointer",
    display: "flex",
    alignItems: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    backgroundColor: theme.palette.background.default,

    paddingLeft: "1em",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  menuClass: {
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 2px 12px 0 rgba( 255, 255, 255, 0.2 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    zIndex: "999",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  backgroundChat: {
    background: theme.palette.background.secondary,
    borderRadius: "15px",
    margin: "12px 0px",
  },
  usersContainer: {
    height: "300px",
    width: "300px",
    overflowY: "scroll",
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translate(-50%)",
    background: "#141414",
    padding: "10px 20px",
    border: "3px solid #bfbfbf",
    borderRadius: "15px",
  },
  userCard: {
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 2px 12px 0 rgba( 255, 255, 255, 0.2 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    color: "#bfbfbf",
    margin: "12px 0px",
  },
}));

const StyledMenu = withStyles({
  paper: {
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 2px 12px 0 rgba( 255, 255, 255, 0.2 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    PaperProps={{ style: { maxHeight: "80vh", overflowY: "scroll" } }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function PrimarySearchAppBar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [messageEl, setMessageEl] = useState(null);
  const [errorMess, setErrorMess] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authReducer, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search.length == 0) {
      setUsers([]);
      setErrorMess(false);
    }
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    if (search) {
      try {
        const config = {
          headers: {
            Cookie: authReducer.token,
          },
        };
        const { data } = await axios.get(
          `/api/users?search=${search}`,
          config,
        );
        setLoading(false);
        setUsers(data);
      } catch (error) {
        dispatch({
          type: GLOBAL_ALERT,
          payload: {
            err:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          },
        });
        setErrorMess(true);
        setLoading(false);
      }
    }
  };

  const handleCloseSearch = () => {
    setUsers([]);
    setSearch("");
  };

  const enterKey = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMessage = (event) => {
    setMessageEl(event.currentTarget);
  };

  const handleCloseMessage = () => {
    setMessageEl(null);
  };

  return (
    <div className={classes.flex}>
      <AppBar position="fixed" className={classes.menuClass}>
        <Toolbar className={classes.toolBar}>
          <Typography className={classes.title} variant="h6" noWrap>
            MERNN App
          </Typography>
          <div className={classes.search}>
            <InputBase
              id="search"
              placeholder="Search Users"
              onKeyDown={enterKey}
              onChange={handleChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
            {search ? (
              <Button
                onClick={handleCloseSearch}
                className={classes.searchButton}
              >
                <CloseIcon />
              </Button>
            ) : (
              <Button
                onClick={handleSearch}
                className={classes.searchButton}
              >
                <SearchIcon />
              </Button>
            )}

            {search && (
              <div className={classes.usersContainer}>
                {loading && <Loader />}
                {errorMess ? <Error errorMessage={alert.err} /> : ""}
                <>
                  {users.map((user) => (
                    <Link href={`/users/${user._id}`} key={user._id}>
                      <Card
                        className={classes.userCard}
                        onClick={handleCloseSearch}
                      >
                        <CardHeader
                          avatar={
                            <Avatar
                              alt="Avatar Picture"
                              src={`../../dist/img/users/${user.photo}`}
                            />
                          }
                          title={user.name}
                          subheader={user.email}
                        />
                      </Card>
                    </Link>
                  ))}
                </>
              </div>
            )}
          </div>
          <div>
            <Button
              aria-controls="customized-menu-message"
              aria-haspopup="true"
              color="primary"
              onClick={handleClickMessage}
            >
              <QuestionAnswerIcon />
            </Button>
            <StyledMenu
              id="customized-menu-message"
              anchorEl={messageEl}
              keepMounted
              open={Boolean(messageEl)}
              onClose={handleCloseMessage}
            >
              <StyledMenuItem>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText primary="Mateusz Masłowiec" />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText primary="Mateusz Masłowiec" />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText primary="Mateusz Masłowiec" />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText primary="Mateusz Masłowiec" />
              </StyledMenuItem>
            </StyledMenu>

            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              color="primary"
              onClick={handleClick}
            >
              <Notifications />
            </Button>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem>
                <ListItemIcon>
                  <SendIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Sent mail" />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon>
                  <DraftsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon>
                  <InboxIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </StyledMenuItem>
            </StyledMenu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
