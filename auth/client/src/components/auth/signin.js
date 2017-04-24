import React from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/index';
import { Link } from 'react-router';
import FacebookLogin from 'react-facebook-login';

class Signin extends React.Component {
    handleFormSubmit({email, password}) {
        console.log(email, password);
        this.props.signinUser({ email, password });
        //Need to do something to log user in
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

    responseFacebook = (response) => {
        const facebookRes = { facebookId: response.id, accessToken: response.accessToken }
        console.log(response.id);
        console.log(response.accessToken);
        this.props.signinUserWithFacebook(facebookRes);
    }

    render() {
        const {
            handleSubmit,
            fields: {
                email,
                password
            }
        } = this.props;



        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <fieldset className="form-group">
                        <label>Email:</label>
                        <input {...email} className="form-control" />
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Password:</label>
                        <input {...password} type="password" className="form-control" />
                    </fieldset>
                    {this.renderAlert()}
                    <button action="submit" className="btn btn-primary">Sign in</button>
                </form>
                <br />
                <br />
                <div>
                    <FacebookLogin
                        appId="1694958553862518"
                        autoLoad={true}
                        fields="name,email"
                        callback={this.responseFacebook} />,
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    }
}

export default reduxForm({
    form: "signin",
    fields: ["email", "password"]
}, mapStateToProps, actions)(Signin);