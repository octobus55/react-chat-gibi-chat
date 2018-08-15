import React, { Component, Fragment } from 'react';
import { ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';

class ListItemMessage extends Component {
    render() {
        const { index, value, sendTime, isSamePerson, isSendByMe, name } = this.props;
        if (!isSendByMe) {
            return (
                
                <ListItem key={index} style={{ width: window.innerWidth / 4, backgroundColor: '#9999ff', borderRadius: 50, marginTop: 10,marginLeft: 10}}
                    >
                    {!isSamePerson &&
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: '#303f9f'}}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                    }
                    {isSamePerson === true ?
                    <ListItemText 
                        primary={value}
                        secondary={sendTime}
                        style={{ paddingLeft: 55 }}
                    /> : <ListItemText style={{whiteSpace: 'pre-line'}}
                            primary={<Fragment><span><b>{name}</b></span><span>{' \n' + value}</span></Fragment>}
                            secondary={sendTime}
                        />}
                </ListItem>
                
            )
        }
        else {
            return (
                <ListItem key={index}  style={{ width: window.innerWidth / 4, marginLeft: (window.innerWidth / 3) + 70, 
                    backgroundColor: '#9999ff', borderRadius: 50,  marginTop: 10 }}
                    >
                    {isSamePerson === true ? <ListItemText
                        primary={value}
                        secondary={sendTime}
                        style={{ width: window.innerWidth / 3}}
                    /> : <ListItemText
                            primary={<Fragment><span><b>{name}</b></span><span>{'\n' + value}</span></Fragment>}
                            secondary={sendTime}
                            style={{ width: window.innerWidth / 3, whiteSpace: 'pre-line'}}
                        />}
                    {!isSamePerson &&
                        <ListItemAvatar style={{backgroundColor: '#303f9f'}}>
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