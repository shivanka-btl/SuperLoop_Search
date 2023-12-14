/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar } from '../../store/actions/Notifier';
import Button from 'components/CustomButtons/Button.jsx';
import { withStyles } from '@material-ui/core';

const styles = {
  notiCloseButton: {
    borderRadius: '100%',
    textAlign: 'center',
    padding: '5px 10px',
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  }
}
class Notifier extends Component {
  displayed = [];

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    const { notifications: currentSnacks } = this.props;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i += 1) {
      if (notExists) continue;
      notExists =
        notExists ||
        !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
    }
    return notExists;
  }

  componentDidUpdate() {
    const { classes, notifications = [] } = this.props;

    notifications.forEach(notification => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(notification.key)) return;
      //Adding a custom button to close the notification
      notification.options.action = key => <Button className={classes.notiCloseButton} onClick={() => this.props.closeSnackbar(key)}>X</Button>
      // Display snackbar using notistack
      this.props.enqueueSnackbar(notification.message, notification.options);
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(notification.key);
      // Dispatch action to remove snackbar from redux store
      this.props.removeSnackbar(notification.key);
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  notifications: state.notifier.notifications
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeSnackbar }, dispatch);

export default withSnackbar(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Notifier))
);