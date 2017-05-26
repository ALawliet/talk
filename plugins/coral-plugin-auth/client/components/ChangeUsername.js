import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import translations from '../translations';
import I18n from 'coral-framework/modules/i18n/i18n';
import errorMsj from 'coral-framework/helpers/error';
import validate from 'coral-framework/helpers/validate';
import CreateUsernameDialog from './CreateUsernameDialog';

const lang = new I18n(translations);

import {
  showCreateUsernameDialog,
  hideCreateUsernameDialog,
  invalidForm,
  validForm,
  createUsername
} from 'coral-framework/actions/auth';

class ChangeUsernameContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        username: (props.auth.user && props.auth.user.username) || ''
      },
      errors: {},
      showErrors: false
    };
  }

  handleChange = e => {
    const {name, value} = e.target;
    this.setState(
      state => ({
        ...state,
        formData: {
          ...state.formData,
          [name]: value
        }
      }),
      () => {
        this.validation(name, value);
      }
    );
  };

  addError = (name, error) => {
    return this.setState(state => ({
      errors: {
        ...state.errors,
        [name]: error
      }
    }));
  };

  validation = (name, value) => {
    const {addError} = this;

    if (!value.length) {
      addError(name, lang.t('createdisplay.requiredField'));
    } else if (!validate[name](value)) {
      addError(name, errorMsj[name]);
    } else {
      const {[name]: prop, ...errors} = this.state.errors; // eslint-disable-line
      // Removes Error
      this.setState(state => ({...state, errors}));
    }
  };

  isCompleted = () => {
    const {formData} = this.state;
    return !Object.keys(formData).filter(prop => !formData[prop].length).length;
  };

  displayErrors = (show = true) => {
    this.setState({showErrors: show});
  };

  handleSubmitUsername = e => {
    e.preventDefault();
    const {errors} = this.state;
    const {validForm, invalidForm} = this.props;
    this.displayErrors();
    if (this.isCompleted() && !Object.keys(errors).length) {
      this.props.createUsername(this.props.auth.user.id, this.state.formData);
      validForm();
    } else {
      invalidForm(lang.t('createdisplay.checkTheForm'));
    }
  };

  handleClose = () => {
    this.props.hideCreateUsernameDialog();
  };

  render() {
    const {loggedIn, auth} = this.props;
    return (
      <div>
        <CreateUsernameDialog
          open={auth.showCreateUsernameDialog && auth.user.canEditName}
          handleClose={this.handleClose}
          loggedIn={loggedIn}
          handleSubmitUsername={this.handleSubmitUsername}
          {...this}
          {...this.state}
          {...this.props}
        />
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => ({
  auth: auth.toJS()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createUsername,
      showCreateUsernameDialog,
      hideCreateUsernameDialog,
      invalidForm,
      validForm
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  ChangeUsernameContainer
);
