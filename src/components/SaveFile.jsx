import React from 'react';

import Save from 'material-ui-icons/Save';
import Check from 'material-ui-icons/Check';
import Clear from 'material-ui-icons/Clear';

import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
} from 'material-ui/Dialog';

export default class FormDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCancel = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    this.setState({ open: false });

    this.props.saveFile();
  };

  render() {
    return (
      <div>
        <Tooltip id="tooltip-bottom" title="Salvar" placement="bottom">
          <Button onClick={this.handleClickOpen}><Save style={{ 'color': '#ffffff' }} /></Button>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              Digite o nome do arquivo:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nome"
              type="email"
              fullWidth
              value={this.props.filename}
              onChange={this.props.setFilename}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              <Clear style={{ 'color': 'red' }} />
            </Button>
            <Button onClick={this.handleSave} color="primary">
              <Check style={{ 'color': 'green' }} />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
