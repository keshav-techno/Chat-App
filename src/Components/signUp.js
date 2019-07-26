import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import fire from '../config/fire';


export default class SignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            errors: [],
            loading: false
        }
    }

    validation = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            console.log(this.state);
            error = { message: 'Fill in all feilds' };
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        else if (this.passValid(this.state)) {
            error = { message: 'Password is invalid' };
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        else {
            return true;
        }
    }

    isFormEmpty = ({ username, email, password, confirm_password }) => {
        return !username.length || !email.length || !password.length || !confirm_password.length

    }

    passValid = ({ password, confirm_password }) => {
        if (password.length >= 6) {
            return false;
        }
        else if (password !== confirm_password) {
            return false;
        }
        else {
            return true;
        }
    }

    displayErrors = errors => errors.map((error, i) => <h2 key={i}>{error.message}</h2>)

    handleInputError = (errors, InputValue) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(InputValue)
        )
            ? 'error'
            : ''
    }
    
    
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handlesubmit = (e) => {
        e.preventDefault();
        if (this.validation()) {
            this.setState({ errors: [], loading: true })
            fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser)
                    this.setState({ loading: false })
                })
                .catch(err => {
                    this.setState({ errors: this.state.errors.concat(err), loading: false })
                });
        }
    }

    render() {
        const { errors, loading } = this.state;
        return (
            <div className="ca-container--alignCenter">
                <Grid textAlign='center'>
                    <Grid.Column textAlign="center" largeScreen="5" widescreen="4">
                        <Icon name='registered' size="huge" color='blue' />
                        <Header as='h1' textAlign='center'>
                            Register
                    </Header>
                        <Form>
                            <Segment>
                                {errors[0] ? <Message color="red">{errors[0] && errors[0].message}</Message> : null}
                                <Form.Input
                                    fluid name='username'
                                    type='text' icon='user'
                                    iconPosition='left'
                                    placeholder='username'
                                    errors
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid name='email'
                                    type='email'
                                    icon='mail'
                                    iconPosition='left'
                                    placeholder='xyz@example.com'
                                    className={this.handleInputError(errors, 'email')}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid name='password'
                                    type='password'
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    className={this.handleInputError(errors, 'password')}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid name='confirm_password'
                                    type='password'
                                    icon='repeat'
                                    iconPosition='left'
                                    placeholder='Re-enter password'
                                    className={this.handleInputError(errors, 'password')}
                                    onChange={this.handleChange}
                                />
                                <Button
                                    disabled={loading}
                                    className={loading ? "loading" : ""}
                                    onClick={this.handlesubmit}
                                    color='blue'>
                                    Submit
                                    </Button>
                            </Segment>
                        </Form>
                        <Message>Already a User ? <Link to='/login'>Login <Icon name='sign in' color='grey' /> </Link> </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}