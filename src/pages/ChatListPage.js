import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header';
import ChatList from '../components/ChatList';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        overflow: "hidden",
        height: "100vh"
    },
    fabButton: {
        position: "absolute",
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    }
}));

const ChatListPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header />
            <ChatList />
            <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                <AddIcon />
            </Fab>
        </div>
    )
}

export default ChatListPage;