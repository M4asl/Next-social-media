import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { AvatarGroup } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  backgroundChat: {
    background: theme.palette.background.secondary,
    borderRadius: "15px",
    margin: "12px 0px",
  },
  textBox: {
    display: "flex",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

const ChatList = () => {
  const classes = useStyles();
  const router = useRouter();
  const { chatReducer, userReducer } = useSelector((state) => state);
  const [chats, setChats] = useState(chatReducer.chats);
  const [chatId, setChatId] = useState("");
  const currentUserId = userReducer.currentUserDetails._id;

  return (
    <List>
      {chats.map((chat) => (
        <ListItem className={classes.backgroundChat} key={chat._id}>
          {chat.isGroupChat ? (
            <ListItemAvatar style={{ marginRight: "16px" }}>
              <AvatarGroup max={2} spacing="small">
                {chat.users
                  .filter((user) => user._id !== currentUserId)
                  .map((user) => (
                    <Avatar key={user._id} />
                  ))}
              </AvatarGroup>
            </ListItemAvatar>
          ) : (
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
          )}
          <div className={classes.textBox}>
            {chat.users
              .slice(0, 2)
              .filter((user) => user._id !== currentUserId)
              .map((user, i) => (
                <Typography variant="subtitle2" key={user._id}>
                  {(i ? ", " : "") + user.name}
                </Typography>
              ))}
            {chat.users.length > 3 && (
              <Typography variant="subtitle2">
                + {chat.users.length - 3} other users
              </Typography>
            )}
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
