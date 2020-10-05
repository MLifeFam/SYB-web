import React , {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup'

class Authentication extends Component{
    state = {
        username:"",
        pasword:""
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.tager.value;
        this.setState(nextState);
    }

    handleRegister = () => {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onRegister(id, pw).then(
            (result) => {
                if(!result){
                    this.setState({
                        username: '',
                        password:''
                    });
                }
            }
        );
    }

    render (){

        const loginView = <Login/>;
        const registerView = <Signup/>;

        return(
            <div>
                {this.props.mode ? loginView : registerView}
            </div>
        );
    }
}

Authentication.propTypes = {
    mode: PropTypes.bool,
    onRegister: PropTypes.func
};

Authentication.defaultProps = {
    mode: true,
    onRegister: (id,pw) => {
        console.error("register function is not defined");}
};

export default Authentication;