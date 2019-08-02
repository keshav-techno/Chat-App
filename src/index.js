import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import Login from './components/login';
import SignUp from './components/signUp';
import './styles/styles.scss'
import fire from './config/fire'

import 'semantic-ui-css/semantic.min.css';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers';
import { setUser, clearUser } from './actions';
import { Spinner } from './spinner';

const store = createStore(rootReducer, composeWithDevTools());

export default class Root extends React.Component {

    componentDidMount() {        
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                // console.log(user);
                this.props.setUser(user);
                this.props.history.push('/');
            }
            else{
                this.props.history.push('/login');
                this.props.clearUser();
            }
        })
    }

    render() {
        return this.props.isLoading?
        <Spinner/> : (
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={SignUp} />
            </Switch>
        )
    }
}

const mapStateFromProps = state => ({
    isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(
    connect(
        mapStateFromProps,{setUser, clearUser}) (Root)
    );

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithAuth />
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
