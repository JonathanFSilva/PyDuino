import React from 'react';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';

import SelectTheme from './SelectTheme.jsx';


class Bar extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="static" style={{ backgroundColor: '#2BBBAD', width: '100%'}}>
        <Toolbar>
          <Typography variant="title" color="inherit" style={{ paddingRight: '30px' }}>
            PyDuino
          </Typography>
          <Button onClick={this.props.getTokens}>Lexer</Button>
          <Button onClick={this.props.clear}>Limpar</Button>
          <SelectTheme theme={this.props.theme} setTheme={this.props.setTheme}/>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Bar;
