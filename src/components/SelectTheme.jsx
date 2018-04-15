import React from 'react';

import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';


class SelectTheme extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Temas</Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Selecione um tema</DialogTitle>
          <DialogContent>
            <form>
              <FormControl style={{ width: '100%' }}>
                <InputLabel htmlFor="theme">Tema</InputLabel>
                <Select native value={this.props.theme} onChange={this.props.setTheme('theme')}>
                  <option value="" />
                  <option value={'chrome'}>Chrome</option>
                  <option value={'github'}>Github</option>
                  <option value={'monokai'}>Monokai</option>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default SelectTheme;
