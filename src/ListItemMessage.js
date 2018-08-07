import React, { Component } from 'react';
import { ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'

class ListItemMessage extends Component {
    render() {
        const { index, value, sendTime, isSamePerson, isSendByMe } = this.props;
        if (!isSendByMe) {
            return (
                <ListItem key={index}
                    >
                    {!isSamePerson &&
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                    }
                    {isSamePerson === true ? <ListItemText
                        primary={value}
                        secondary={sendTime}
                        style={{ paddingLeft: 55 }}
                    /> : <ListItemText
                            primary={value}
                            secondary={sendTime}
                        />}
                </ListItem>
            )
        }
        else {
            return (
                <ListItem key={index}  style={{ width: window.innerWidth / 3, marginLeft: (window.innerWidth / 3) }}
                    >
                    {isSamePerson === true ? <ListItemText
                        primary={value}
                        secondary={sendTime}
                    /> : <ListItemText
                            primary={value}
                            secondary={sendTime}
                            style={{ width: window.innerWidth / 3}}
                        />}
                    {!isSamePerson &&
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                    }
                </ListItem>
            )

        }

    }
}
export default ListItemMessage;