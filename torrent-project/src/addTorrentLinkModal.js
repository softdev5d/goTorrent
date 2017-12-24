import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import InsertLinkIcon from 'material-ui-icons/Link';
import ReactTooltip from 'react-tooltip'
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';




const button = {
  fontSize: '60px',
  paddingRight: '20px',
  paddingLeft: '20px',
}

const inlineStyle = {
  display: 'inline-block',
  backdrop: 'static',
}

export default class addTorrentPopup extends React.Component {



  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
      this.setState({ open: false });
      //let magnetLinkSubmit = this.state.textValue;
      let magnetLinkMessage = {
        messageType: "magnetLinkSubmit",
        Payload: { MagnetLink: this.state.textValue}
      }
      console.log("Sending magnet link: ", magnetLinkMessage);
      ws.send(JSON.stringify(magnetLinkMessage));
  }

  setTextValue = (event) => {
    this.setState({textValue: event.target.value});
  }

  render() {
    const { classes, onRequestClose, handleRequestClose, handleSubmit } = this.props;
    return (
      <div style={inlineStyle}>
        <IconButton onClick={this.handleClickOpen} color="primary" data-tip="Add Magnet Link" style={button}  centerRipple aria-label="Add Magnet Link" >
        <ReactTooltip place="top" type="light" effect="float" />
        <InsertLinkIcon />
      </IconButton>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>Add Magnet Link</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a Magnet Link here and hit submit to add torrent...
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Magnet Link"
              type="text"
              placeholder="Enter Magnet Link Here"
              fullWidth
              onChange={this.setTextValue}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
};
