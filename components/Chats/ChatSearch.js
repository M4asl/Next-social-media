import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { IconButton, TextField } from "@material-ui/core";
import { createChat } from "../../store/actions/chatActions";

const CustomAutocomplete = withStyles({
  root: {
    width: "100%",
    zIndex: "999",
    maxHeight: "56px",
    "& label.Mui-focused": {
      color: "#bfbfbf",
    },
    "& label": {
      color: "#bfbfbf",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#bfbfbf",
        borderRadius: "15px",
      },
      "&:hover fieldset": {
        borderColor: "#bfbfbf",
        borderRadius: "15px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#bfbfbf",
        borderRadius: "15px",
      },
    },
  },
  listbox: {
    backgroundColor: "#2d2d2d",
    padding: "10px",
    "& li": {
      color: "#bfbfbf",
      background: "rgba( 255, 255, 255, 0.25 )",
      backdropFilter: "blur( 10.0px )",
      border: "1px solid rgba( 255, 255, 255, 0.18 )",
      borderRadius: "15px",
      padding: "10px",
      margin: "10px",
    },
  },
  tag: {
    backgroundColor: "#141414",
    height: 32,
    position: "relative",
    zIndex: 0,
    "& .MuiChip-label": {
      color: "#fff",
    },
    "& .MuiChip-deleteIcon": {
      color: "white",
    },
  },
  endAdornment: {
    "& .MuiIconButton-root": {
      color: "#bfbfbf",
    },
  },
  inputRoot: {
    backgroundColor: "#2D2D2D",
  },
})(Autocomplete);

const ChatSearch = ({ users }) => {
  const [selectedOptions, setSelectedOptions] = useState();
  const dispatch = useDispatch();
  const handleChange = (event, value) => setSelectedOptions(value);
  const handleSubmit = () => {
    if (selectedOptions.length > 1) {
      dispatch(createChat(selectedOptions));
    } else if (selectedOptions.length === 1) {
      dispatch(createChat(selectedOptions[0]._id));
    }
  };
  return (
    <>
      <CustomAutocomplete
        multiple
        id="multiple-limit-tags"
        options={users}
        getOptionLabel={(user) => user.name}
        filterSelectedOptions
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Users"
            label="Find users..."
          />
        )}
      />
      <IconButton onClick={handleSubmit}>
        <GroupAddIcon style={{ color: "#bfbfbf" }} />
      </IconButton>
    </>
  );
};

export default ChatSearch;
