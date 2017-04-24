import React from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends React.Component {
    handleFormSubmit(formProps) {
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const {handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <input {...email} className="form-control" />
                    {email.touched && email.error && <div className="error">{email.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input {...password} type="password" className="form-control" />
                    {password.touched && password.error && <div className="error">{password.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password:</label>
                    <input {...passwordConfirm} type="password" className="form-control" />
                    {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign Up!</button>
            </form>
        );
    }
}

function validate(formProps) {
    const error = {};
    if (!formProps.email) {
        error.email = "Please enter an email";
    }

    if (!formProps.password) {
        error.password = "Please enter a password"
    }

    if (!formProps.passwordConfirm) {
        error.passwordConfirm = "Please enter a password confirmation"
    }

    if (formProps.password !== formProps.passwordConfirm) {
        error.password = "Passworks must match";
    }

    return error;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    }
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(Signup);