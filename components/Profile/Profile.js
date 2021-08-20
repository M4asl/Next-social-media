import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
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
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 100,
    minHeight: "37vh",
    position: "sticky",
    top: "10%",
    left: "6%",
    borderRadius: "20px",
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
    height: "28vh",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const { authReducer, alert } = useSelector((state) => state);
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            alt="Avatar Picture"
            src={`../../dist/img/users/${authReducer.currentUserDetails.photo}`}
          />
        }
        action={
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        }
        title={authReducer.currentUserDetails.name}
        subheader={authReducer.currentUserDetails.email}
      />
      <CardContent className={classes.descriptionContainer}>
        <List component="ul" aria-label="description">
          <ListItem>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText
              secondary={
                authReducer.currentUserDetails
                  ? authReducer.currentUserDetails.about
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
                authReducer.currentUserDetails
                  ? authReducer.currentUserDetails.facebook
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
                authReducer.currentUserDetails
                  ? authReducer.currentUserDetails.instagram
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
                authReducer.currentUserDetails
                  ? authReducer.currentUserDetails.twitter
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
                authReducer.currentUserDetails
                  ? authReducer.currentUserDetails.youtube
                  : "Youtube."
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
