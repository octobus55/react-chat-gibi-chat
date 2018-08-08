import React, { Component } from 'react';
import { ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'

class ListItemMessage extends Component {
    render() {
        const { index, value, sendTime, isSamePerson, isSendByMe, name } = this.props;
        const name1 = name.bold();
        if (!isSendByMe) {
            return (
                
                <ListItem key={index} style={{ width: window.innerWidth / 4, backgroundColor: '#a5bed9', borderRadius: 50, marginTop: 10}}
                    >
                    {!isSamePerson &&
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: '#303f9f'}}>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                    }
                    {isSamePerson === true ?
                    <ListItemText 
                        primary={value}
                        secondary={sendTime}
                        style={{ paddingLeft: 55 }}
                    /> : <ListItemText style={{whiteSpace: 'pre-line'}}
                            primary={name  + ' said : \n' + value}
                            secondary={sendTime}
                        />}
                </ListItem>
            )
        }
        else {
            return (
                <ListItem key={index}  style={{ width: window.innerWidth / 4, marginLeft: (window.innerWidth / 3), 
                    backgroundColor: '#a5bed9', borderRadius: 50,  marginTop: 10 }}
                    >
                    {isSamePerson === true ? <ListItemText
                        primary={value}
                        secondary={sendTime}
                        style={{ width: window.innerWidth / 3}}
                    /> : <ListItemText
                            primary={name  + ' said: \n' + value}
                            secondary={sendTime}
                            style={{ width: window.innerWidth / 3, whiteSpace: 'pre-line'}}
                        />}
                    {!isSamePerson &&
                        <ListItemAvatar style={{backgroundColor: '#303f9f'}}>
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