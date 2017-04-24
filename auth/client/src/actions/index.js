import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = "http://localhost:3090";

export function signinUser({email, password}) {
    return function (dispatch) {
        //Submit email,password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                //If request is good
                //Update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });
                //Save the JWT token
                localStorage.setItem('token', response.data.token);
                //redirect to the route '/feature'
                browserHistory.push('/feature');
            })
            .catch(() => {
                //if request is bad
                //Display error msg
                dispatch(authError(response.data.error));
            });
    }
}

export function authError(err) {
    return {
        type: AUTH_ERROR,
        payload: err
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    }
}

export function signupUser({ email, password }) {
    return function (dispatch) {
        //Submit email,password to the server
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                //If request is good
                //Update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });
                //Save the JWT token
                localStorage.setItem('token', response.data.token);
                //redirect to the route '/feature'
                browserHistory.push('/feature');
            })
            .catch((response) => {
                //if request is bad
                //Display error msg
                dispatch(authError(response.data.error));
            });
    }
}

export function signinUserWithFacebook({facebookId, accessToken}) {
    return function (dispatch) {
        //Submit email,password to the server
        axios.post(`${ROOT_URL}/facebooksignin`, { facebookId, accessToken })
            .then(response => {
                //If request is good
                //Update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });
                //Save the JWT token
                localStorage.setItem('token', response.data.token);
                //redirect to the route '/feature'
                browserHistory.push('/feature');
            })
            .catch(() => {
                //if request is bad
                //Display error msg
                dispatch(authError(response.data.error));
            });
    }
}

export function fetchMessage() {
    return function (dispatch) {
        axios.get(ROOT_URL, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            })
            .catch(() => {
                dispatch(authError(response.data.error));
            });
    }
}