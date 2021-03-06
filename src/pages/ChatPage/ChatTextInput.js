import React from "react";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import SendButton from "../../common/buttons/SendButton";
import { selectUserId, selectUserName } from "../LoginPage/loginSlice";
import { getClient } from "../../api/websocket";

const useStyles = makeStyles((theme) => ({
  chatTextInput: {
    flexShrink: 0,
  },
  chatTextForm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1.5),
    marginTop: theme.spacing(1),
    "& .MuiOutlinedInput-root": {
      borderRadius: "2.5rem",
    },
  },
  inputField: {
    flexGrow: 1,
  },
  sendButton: {
    margin: "0 1rem",
  },
}));

const ChatTextInput = ({ chatId }) => {
  const classes = useStyles();
  const [input, setInput] = React.useState("");
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const websocket = getClient();

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    const toSend = input.trim();
    if (toSend === "") return;

    const payload = {
      userId: userId,
      name: userName,
      text: toSend,
    };

    setInput("");

    websocket.publish({
      destination: `/ws/app/chats/${chatId}/message`,
      body: JSON.stringify(payload),
    });
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <div className={classes.chatTextInput}>
      <Divider />
      <form
        className={classes.chatTextForm}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          className={classes.inputField}
          id="chat-text-input"
          value={input}
          onChange={handleChange}
          placeholder="Write a message..."
          variant="outlined"
          multiline
          rowsMax="3"
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          disabled={websocket === undefined}
          InputLabelProps={{ disabled: true }}
        />
        <SendButton className={classes.sendButton} onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default ChatTextInput;
