import React, { Component, Fragment } from 'react';
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';

import './styles.css'

class ListItemMessage extends Component {
    render() {
        const { index, value, sendTime, isSamePerson, isSendByMe, name } = this.props;
        if (!isSendByMe) {
            return (
                <ListItem key={index} className='ListItemOther'>
                    {!isSamePerson &&
                        <ListItemAvatar className='ListItemAvatar'>
                            <Avatar >
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                    }
                    {isSamePerson ?
                        <ListItemText
                            primary={value}
                            secondary={sendTime}
                            style={{ paddingLeft: 55 }}
                        /> : <ListItemText style={{ whiteSpace: 'pre-line' }}
                            primary={<Fragment><span><b>{name}</b></span><span>{' \n' + value}</span></Fragment>}
                            secondary={sendTime}
                        />}
                </ListItem>
            )
        }
        else {
            return (
                <ListItem className='ListItemMe' key={index}>
                    {isSamePerson ? <ListItemText
                        primary={value}
                        secondary={sendTime}
                        style={{ width: window.innerWidth / 3 }}
                    /> : <ListItemText
                            primary={<Fragment><span><b>{name}</b></span><span>{'\n' + value}</span></Fragment>}
                            secondary={sendTime}
                            style={{ width: window.innerWidth / 3, whiteSpace: 'pre-line' }}
                        />}
                    {!isSamePerson &&
                        <ListItemAvatar className='ListItemAvatar'>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                    }
                </ListItem>
            )
        }
    }
}
export default ListItemMessage;