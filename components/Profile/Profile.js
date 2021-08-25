import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DescriptionIcon from "@material-ui/icons/Description";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
  Button,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { editUserProfile } from "../../store/actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 100,
    minHeight: "43vh",
    position: "sticky",
    top: "10%",
    left: "6%",
    borderRadius: "15px",
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 2px 12px 0 rgba( 255, 255, 255, 0.2 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    overflowWrap: "anyhere",
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "34vh",
    padding: "0px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 2px 12px 0 rgba( 255, 255, 255, 0.2 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    padding: theme.spacing(2, 6, 3),
  },
}));

export default function Profile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userReducer, alert } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const CHARACTER_LIMIT = 100;
  const [values, setValues] = useState({
    about: "",
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValues({
      about: "",
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    values.about && formData.append("about", values.about);
    values.facebook && formData.append("facebook", values.facebook);
    values.instagram &&
      formData.append("instagram", values.instagram);
    values.twitter && formData.append("twitter", values.twitter);
    values.youtube && formData.append("youtube", values.youtube);
    dispatch(
      editUserProfile(formData, userReducer.currentUserDetails._id),
    );
    handleClose();
  };
  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              alt="Avatar Picture"
              src={`../../dist/img/users/${userReducer.currentUserDetails.photo}`}
            />
          }
          action={
            <IconButton aria-label="edit" onClick={handleOpen}>
              <EditIcon />
            </IconButton>
          }
          title={userReducer.currentUserDetails.name}
          subheader={userReducer.currentUserDetails.email}
        />
        <CardContent className={classes.descriptionContainer}>
          <List component="ul" aria-label="description">
            <ListItem>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText
                secondary={
                  userReducer.currentUserDetails
                    ? userReducer.currentUserDetails.about
                    : "Create your user description."
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FacebookIcon />
              </ListItemIcon>
              <ListItemText
                secondary={
                  userReducer.currentUserDetails
                    ? userReducer.currentUserDetails.facebook
                    : "Facebook."
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InstagramIcon />
              </ListItemIcon>
              <ListItemText
                secondary={
                  userReducer.currentUserDetails
                    ? userReducer.currentUserDetails.instagram
                    : "Instagram."
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <TwitterIcon />
              </ListItemIcon>
              <ListItemText
                secondary={
                  userReducer.currentUserDetails
                    ? userReducer.currentUserDetails.twitter
                    : "Twitter."
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <YouTubeIcon />
              </ListItemIcon>
              <ListItemText
                secondary={
                  userReducer.currentUserDetails
                    ? userReducer.currentUserDetails.youtube
                    : "Youtube."
                }
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2>Update your profile description.</h2>
              <TextField
                label="About"
                inputProps={{
                  maxlength: CHARACTER_LIMIT,
                }}
                multiline
                value={values.about}
                helperText={`${values.about.length}/${CHARACTER_LIMIT}`}
                onChange={handleChange("about")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Facebook"
                value={values.facebook}
                onChange={handleChange("facebook")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Instagram"
                value={values.instagram}
                onChange={handleChange("instagram")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Twitter"
                value={values.twitter}
                onChange={handleChange("twitter")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Youtube"
                value={values.youtube}
                onChange={handleChange("youtube")}
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Update profile
              </Button>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
