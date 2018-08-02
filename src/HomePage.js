import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {GridList, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction ,
    ListItemText, Avatar, Input, TextField, Paper, Tabs, Tab, Button, Grid} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder'
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite'
import {PersonPinIcon, AddIcon} from '@material-ui/icons';

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

class HomePage extends Component {
    state = { activeItem: 'Groups', tabValue: 0, isSelected : false, secondary : false, dense : false }
    componentWillReceiveProps() {
    }

    handleTabChange = (event, tabValue) => {
        this.setState({ tabValue });
    };
    generate(element) {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(value =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }
    generate1(element) {
        return [0, 1, 2, 3, 4, 5, 6, 7].map(value =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }
    render() {
        if (!this.props.loginSucces) {
            return (
                <LoginPage />
            )
        }
        const { classes } = this.props;
        const { dense, secondary } = this.state;
        return (
            <Grid container>
                <Grid container xs={4} sm={4} md={4} lg={4} direction='row' alignItems='stretch' style={{ minHeight: window.innerHeight - 50 }}>
                    <Paper style={{ width: window.innerWidth / 3 }}>
                        <Tabs
                            value={this.state.tabValue}
                            onChange={this.handleTabChange}
                            fullWidth
                            indicatorColor="secondary"
                            textColor="secondary"
                        >
                            <Tab icon={<PhoneIcon />} label="RECENTS" />
                            <Tab icon={<FavoriteIcon />} label="FAVORITES" />
                            <Tab icon={<PhoneIcon />} label="FIND SOMEONE" />
                        </Tabs>
                        {this.state.tabValue === 0 && <Paper style={{ overflow: 'auto', maxHeight: window.innerHeight - 120 }}

                        >
                            <List dense={dense} style={{ overflow: 'auto', maxHeight: window.innerHeight - 120 }}>
                                {this.generate(
                                    <ListItem button onClick={() => { this.isSelected = !this.isSelected }}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Single Chat"
                                            secondary={secondary ? 'Secondary text' : 'secondary text'}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Paper>
                        }
                        {this.state.tabValue === 1 && <Paper style={{ overflow: 'auto', maxHeight: window.innerHeight - 120 }}

                        >
                            <List dense={dense} style={{ overflow: 'auto', maxHeight: window.innerHeight - 120 }}>
                                {this.generate1(
                                    <ListItem button onClick={() => { this.isSelected = !this.isSelected }}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Group Chat"
                                            secondary={secondary ? 'Secondary text' : 'secondary text'}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Paper>
                        }


                    </Paper>
                </Grid>
                <Grid container xs={8} sm={8} md={8} lg={8} direction='row' alignItems='stretch' justify='space-evenly' style={{ paddingLeft: 30 }}>
                    <GridList>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta justo lectus. Fusce dapibus diam sit amet mi hendrerit condimentum. Vivamus risus odio, faucibus ac auctor vitae, vestibulum eu erat. Aenean sit amet porta ante, eu placerat purus. Vivamus vehicula lacus ac leo eleifend dignissim. Sed ac fermentum ex, non eleifend nibh. Sed lacinia ornare posuere. Maecenas auctor mollis rhoncus. Phasellus nec porttitor lorem. Phasellus felis sapien, laoreet consectetur ligula at, condimentum tempus libero. Maecenas rutrum lacus massa, ut ullamcorper lacus convallis eget. Maecenas magna nisi, interdum sit amet sapien sed, rutrum accumsan dolor.

                    Nunc in tellus odio. Duis eget sem eget turpis cursus elementum vitae sit amet nisl. Mauris non ligula ut quam feugiat facilisis. Curabitur eros purus, condimentum sit amet erat sed, dapibus auctor enim. Aenean tristique posuere sem eget consectetur. Etiam ultricies aliquam nisl congue ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget sodales tortor. Donec pulvinar, velit eu vestibulum ornare, urna velit commodo odio, at interdum lectus augue et lacus. Nunc suscipit, elit ac suscipit maximus, velit urna congue risus, dictum scelerisque nulla risus non ex. Morbi efficitur sapien in elit ultrices, in tristique felis tincidunt. Morbi eu est rutrum, semper leo ut, varius nulla. Aliquam at libero in orci auctor mollis. Sed at magna ultricies, tincidunt velit non, sagittis ante.

                    Phasellus vehicula, orci vel fringilla semper, neque enim pretium felis, vitae tincidunt nulla libero ut enim. Etiam et molestie elit, sit amet maximus diam. Nunc rutrum hendrerit aliquet. Etiam rhoncus placerat ante, sit amet egestas magna mattis nec. Nullam ligula quam, tempus convallis quam eu, mattis accumsan nunc. Duis sem nisl, tincidunt in ullamcorper vitae, tristique et lectus. Sed porta massa at porta convallis. In at turpis ut ante maximus auctor vitae quis arcu. Cras in dapibus leo, vel scelerisque libero. Nulla sagittis nunc eu maximus pulvinar. Donec sed ornare erat, nec porttitor eros. Vivamus iaculis nisl ac tincidunt condimentum. Curabitur euismod, leo sed mattis hendrerit, sem dui lobortis tellus, eget fringilla tellus risus quis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur congue libero maorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta justo lectus. Fusce dapibus diam sit amet mi hendrerit condimentum. Vivamus risus odio, faucibus ac auctor vitae, vestibulum eu erat. Aenean sit amet porta ante, eu placerat purus. Vivamus vehicula lacus ac leo eleifend dignissim. Sed ac fermentum ex, non eleifend nibh. Sed lacinia ornare posuere. Maecenas auctor mollis rhoncus. Phasellus nec porttitor lorem. Phasellus felis sapien, laoreet consectetur ligula at, condimentum tempus libero. Maecenas rutrum lacus massa, ut ullamcorper lacus convallis eget. Maecenas magna nisi, interdum sit amet sapien sed, rutrum accumsan dolor.

                    Nunc in tellus odio. Duis eget sem eget turpis cursus elementum vitae sit amet nisl. Mauris non ligula ut quam feugiat facilisis. Curabitur eros purus, condimentum sit amet erat sed, dapibus auctor enim. Aenean tristique posuere sem eget consectetur. Etiam ultricies aliquam nisl congue ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget sodales tortor. Donec pulvinar, velit eu vestibulum ornare, urna velit commodo odio, at interdum lectus augue et lacus. Nunc suscipit, elit ac suscipit maximus, velit urna congue risus, dictum scelerisque nulla risus non ex. Morbi efficitur sapien in elit ultrices, in tristique felis tincidunt. Morbi eu est rutrum, semper leo ut, varius nulla. Aliquam at libero in orci auctor mollis. Sed at magna ultricies, tincidunt velit non, sagittis ante.

                    Phasellus vehicula, orci vel fringilla semper, neque enim pretium felis, vitae tincidunt nulla libero ut enim. Etiam et molestie elit, sit amet maximus diam. Nunc rutrum hendrerit aliquet. Etiam rhoncus placerat ante, sit amet egestas magna mattis nec. Nullam ligula quam, tempus convallis quam eu, mattis accumsan nunc. Duis sem nisl, tincidunt in ullamcorper vitae, tristique et lectus. Sed porta massa at porta convallis. In at turpis ut ante maximus auctor vitae quis arcu. Cras in dapibus leo, vel scelerisque libero. Nulla sagittis nunc eu maximus pulvinar. Donec sed ornare erat, nec porttitor eros. Vivamus iaculis nisl ac tincidunt condimentum. Curabitur euismod, leo sed mattis hendrerit, sem dui lobortis tellus, eget fringilla tellus risus quis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur congue libero maorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta justo lectus. Fusce dapibus diam sit amet mi hendrerit condimentum. Vivamus risus odio, faucibus ac auctor vitae, vestibulum eu erat. Aenean sit amet porta ante, eu placerat purus. Vivamus vehicula lacus ac leo eleifend dignissim. Sed ac fermentum ex, non eleifend nibh. Sed lacinia ornare posuere. Maecenas auctor mollis rhoncus. Phasellus nec porttitor lorem. Phasellus felis sapien, laoreet consectetur ligula at, condimentum tempus libero. Maecenas rutrum lacus massa, ut ullamcorper lacus convallis eget. Maecenas magna nisi, interdum sit amet sapien sed, rutrum accumsan dolor.

                    Nunc in tellus odio. Duis eget sem eget turpis cursus elementum vitae sit amet nisl. Mauris non ligula ut quam feugiat facilisis. Curabitur eros purus, condimentum sit amet erat sed, dapibus auctor enim. Aenean tristique posuere sem eget consectetur. Etiam ultricies aliquam nisl congue ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget sodales tortor. Donec pulvinar, velit eu vestibulum ornare, urna velit commodo odio, at interdum lectus augue et lacus. Nunc suscipit, elit ac suscipit maximus, velit urna congue risus, dictum scelerisque nulla risus non ex. Morbi efficitur sapien in elit ultrices, in tristique felis tincidunt. Morbi eu est rutrum, semper leo ut, varius nulla. Aliquam at libero in orci auctor mollis. Sed at magna ultricies, tincidunt velit non, sagittis ante.

                    Phasellus vehicula, orci vel fringilla semper, neque enim pretium felis, vitae tincidunt nulla libero ut enim. Etiam et molestie elit, sit amet maximus diam. Nunc rutrum hendrerit aliquet. Etiam rhoncus placerat ante, sit amet egestas magna mattis nec. Nullam ligula quam, tempus convallis quam eu, mattis accumsan nunc. Duis sem nisl, tincidunt in ullamcorper vitae, tristique et lectus. Sed porta massa at porta convallis. In at turpis ut ante maximus auctor vitae quis arcu. Cras in dapibus leo, vel scelerisque libero. Nulla sagittis nunc eu maximus pulvinar. Donec sed ornare erat, nec porttitor eros. Vivamus iaculis nisl ac tincidunt condimentum. Curabitur euismod, leo sed mattis hendrerit, sem dui lobortis tellus, eget fringilla tellus risus quis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur congue libero maorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta justo lectus. Fusce dapibus diam sit amet mi hendrerit condimentum. Vivamus risus odio, faucibus ac auctor vitae, vestibulum eu erat. Aenean sit amet porta ante, eu placerat purus. Vivamus vehicula lacus ac leo eleifend dignissim. Sed ac fermentum ex, non eleifend nibh. Sed lacinia ornare posuere. Maecenas auctor mollis rhoncus. Phasellus nec porttitor lorem. Phasellus felis sapien, laoreet consectetur ligula at, condimentum tempus libero. Maecenas rutrum lacus massa, ut ullamcorper lacus convallis eget. Maecenas magna nisi, interdum sit amet sapien sed, rutrum accumsan dolor.

                    Nunc in tellus odio. Duis eget sem eget turpis cursus elementum vitae sit amet nisl. Mauris non ligula ut quam feugiat facilisis. Curabitur eros purus, condimentum sit amet erat sed, dapibus auctor enim. Aenean tristique posuere sem eget consectetur. Etiam ultricies aliquam nisl congue ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget sodales tortor. Donec pulvinar, velit eu vestibulum ornare, urna velit commodo odio, at interdum lectus augue et lacus. Nunc suscipit, elit ac suscipit maximus, velit urna congue risus, dictum scelerisque nulla risus non ex. Morbi efficitur sapien in elit ultrices, in tristique felis tincidunt. Morbi eu est rutrum, semper leo ut, varius nulla. Aliquam at libero in orci auctor mollis. Sed at magna ultricies, tincidunt velit non, sagittis ante.

                    Phasellus vehicula, orci vel fringilla semper, neque enim pretium felis, vitae tincidunt nulla libero ut enim. Etiam et molestie elit, sit amet maximus diam. Nunc rutrum hendrerit aliquet. Etiam rhoncus placerat ante, sit amet egestas magna mattis nec. Nullam ligula quam, tempus convallis quam eu, mattis accumsan nunc. Duis sem nisl, tincidunt in ullamcorper vitae, tristique et lectus. Sed porta massa at porta convallis. In at turpis ut ante maximus auctor vitae quis arcu. Cras in dapibus leo, vel scelerisque libero. Nulla sagittis nunc eu maximus pulvinar. Donec sed ornare erat, nec porttitor eros. Vivamus iaculis nisl ac tincidunt condimentum. Curabitur euismod, leo sed mattis hendrerit, sem dui lobortis tellus, eget fringilla tellus risus quis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur congue libero maorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta justo lectus. Fusce dapibus diam sit amet mi hendrerit condimentum. Vivamus risus odio, faucibus ac auctor vitae, vestibulum eu erat. Aenean sit amet porta ante, eu placerat purus. Vivamus vehicula lacus ac leo eleifend dignissim. Sed ac fermentum ex, non eleifend nibh. Sed lacinia ornare posuere. Maecenas auctor mollis rhoncus. Phasellus nec porttitor lorem. Phasellus felis sapien, laoreet consectetur ligula at, condimentum tempus libero. Maecenas rutrum lacus massa, ut ullamcorper lacus convallis eget. Maecenas magna nisi, interdum sit amet sapien sed, rutrum accumsan dolor.

                    Nunc in tellus odio. Duis eget sem eget turpis cursus elementum vitae sit amet nisl. Mauris non ligula ut quam feugiat facilisis. Curabitur eros purus, condimentum sit amet erat sed, dapibus auctor enim. Aenean tristique posuere sem eget consectetur. Etiam ultricies aliquam nisl congue ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget sodales tortor. Donec pulvinar, velit eu vestibulum ornare, urna velit commodo odio, at interdum lectus augue et lacus. Nunc suscipit, elit ac suscipit maximus, velit urna congue risus, dictum scelerisque nulla risus non ex. Morbi efficitur sapien in elit ultrices, in tristique felis tincidunt. Morbi eu est rutrum, semper leo ut, varius nulla. Aliquam at libero in orci auctor mollis. Sed at magna ultricies, tincidunt velit non, sagittis ante.

                    Phasellus vehicula, orci vel fringilla semper, neque enim pretium felis, vitae tincidunt nulla libero ut enim. Etiam et molestie elit, sit amet maximus diam. Nunc rutrum hendrerit aliquet. Etiam rhoncus placerat ante, sit amet egestas magna mattis nec. Nullam ligula quam, tempus convallis quam eu, mattis accumsan nunc. Duis sem nisl, tincidunt in ullamcorper vitae, tristique et lectus. Sed porta massa at porta convallis. In at turpis ut ante maximus auctor vitae quis arcu. Cras in dapibus leo, vel scelerisque libero. Nulla sagittis nunc eu maximus pulvinar. Donec sed ornare erat, nec porttitor eros. Vivamus iaculis nisl ac tincidunt condimentum. Curabitur euismod, leo sed mattis hendrerit, sem dui lobortis tellus, eget fringilla tellus risus quis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur congue libero maorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta justo lectus. Fusce dapibus diam sit amet mi hendrerit condimentum. Vivamus risus odio, faucibus ac auctor vitae, vestibulum eu erat. Aenean sit amet porta ante, eu placerat purus. Vivamus vehicula lacus ac leo eleifend dignissim. Sed ac fermentum ex, non eleifend nibh. Sed lacinia ornare posuere. Maecenas auctor mollis rhoncus. Phasellus nec porttitor lorem. Phasellus felis sapien, laoreet consectetur ligula at, condimentum tempus libero. Maecenas rutrum lacus massa, ut ullamcorper lacus convallis eget. Maecenas magna nisi, interdum sit amet sapien sed, rutrum accumsan dolor.

                    Nunc in tellus odio. Duis eget sem eget turpis cursus elementum vitae sit amet nisl. Mauris non ligula ut quam feugiat facilisis. Curabitur eros purus, condimentum sit amet erat sed, dapibus auctor enim. Aenean tristique posuere sem eget consectetur. Etiam ultricies aliquam nisl congue ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget sodales tortor. Donec pulvinar, velit eu vestibulum ornare, urna velit commodo odio, at interdum lectus augue et lacus. Nunc suscipit, elit ac suscipit maximus, velit urna congue risus, dictum scelerisque nulla risus non ex. Morbi efficitur sapien in elit ultrices, in tristique felis tincidunt. Morbi eu est rutrum, semper leo ut, varius nulla. Aliquam at libero in orci auctor mollis. Sed at magna ultricies, tincidunt velit non, sagittis ante.

                    Phasellus vehicula, orci vel fringilla semper, neque enim pretium felis, vitae tincidunt nulla libero ut enim. Etiam et molestie elit, sit amet maximus diam. Nunc rutrum hendrerit aliquet. Etiam rhoncus placerat ante, sit amet egestas magna mattis nec. Nullam ligula quam, tempus convallis quam eu, mattis accumsan nunc. Duis sem nisl, tincidunt in ullamcorper vitae, tristique et lectus. Sed porta massa at porta convallis. In at turpis ut ante maximus auctor vitae quis arcu. Cras in dapibus leo, vel scelerisque libero. Nulla sagittis nunc eu maximus pulvinar. Donec sed ornare erat, nec porttitor eros. Vivamus iaculis nisl ac tincidunt condimentum. Curabitur euismod, leo sed mattis hendrerit, sem dui lobortis tellus, eget fringilla tellus risus quis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur congue libero maorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta justo lectus. Fusce dapibus diam sit amet mi hendrerit condimentum. Vivamus risus odio, faucibus ac auctor vitae, vestibulum eu erat. Aenean sit amet porta ante, eu placerat purus. Vivamus vehicula lacus ac leo eleifend dignissim. Sed ac fermentum ex, non eleifend nibh. Sed lacinia ornare posuere. Maecenas auctor mollis rhoncus. Phasellus nec porttitor lorem. Phasellus felis sapien, laoreet consectetur ligula at, condimentum tempus libero. Maecenas rutrum lacus massa, ut ullamcorper lacus convallis eget. Maecenas magna nisi, interdum sit amet sapien sed, rutrum accumsan dolor.

                    Nunc in tellus odio. Duis eget sem eget turpis cursus elementum vitae sit amet nisl. Mauris non ligula ut quam feugiat facilisis. Curabitur eros purus, condimentum sit amet erat sed, dapibus auctor enim. Aenean tristique posuere sem eget consectetur. Etiam ultricies aliquam nisl congue ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget sodales tortor. Donec pulvinar, velit eu vestibulum ornare, urna velit commodo odio, at interdum lectus augue et lacus. Nunc suscipit, elit ac suscipit maximus, velit urna congue risus, dictum scelerisque nulla risus non ex. Morbi efficitur sapien in elit ultrices, in tristique felis tincidunt. Morbi eu est rutrum, semper leo ut, varius nulla. Aliquam at libero in orci auctor mollis. Sed at magna ultricies, tincidunt velit non, sagittis ante.

                    Phasellus vehicula, orci vel fringilla semper, neque enim pretium felis, vitae tincidunt nulla libero ut enim. Etiam et molestie elit, sit amet maximus diam. Nunc rutrum hendrerit aliquet. Etiam rhoncus placerat ante, sit amet egestas magna mattis nec. Nullam ligula quam, tempus convallis quam eu, mattis accumsan nunc. Duis sem nisl, tincidunt in ullamcorper vitae, tristique et lectus. Sed porta massa at porta convallis. In at turpis ut ante maximus auctor vitae quis arcu. Cras in dapibus leo, vel scelerisque libero. Nulla sagittis nunc eu maximus pulvinar. Donec sed ornare erat, nec porttitor eros. Vivamus iaculis nisl ac tincidunt condimentum. Curabitur euismod, leo sed mattis hendrerit, sem dui lobortis tellus, eget fringilla tellus risus quis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur congue libero ma
                    </p>
                    </GridList >
                </Grid>
                <Grid container xs={8} sm={8} md={8} lg={8} direction='column' alignItems='stretch' style={{ position: 'absolute', bottom: 0, right: 0 }}>
                    <Paper>
                        <TextField
                            placeholder="MultiLine with rows: 2 and rowsMax: 4"
                            multiline
                            rows={2}
                            rowsMax={4}
                            fullWidth
                        />
                    </Paper >
                </Grid>
            </Grid>
        )

    }
}
const mapStatetoProps = ({ AuthResponse }) => {
    const { loading, loggedIn, loginSucces } = AuthResponse;
    return {
        loading,
        loggedIn,
        loginSucces
    };
};

export default connect(mapStatetoProps, {})(HomePage);