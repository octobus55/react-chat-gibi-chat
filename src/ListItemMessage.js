import React, { Component } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'

class ListItemMessage extends Component {
    render() {
        const { index,value } = this.props;
        console.log(value);
        return (
            <ListItem key={index}
                divider>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={value}
                />
            </ListItem>
        )
    }
}
export default ListItemMessage;