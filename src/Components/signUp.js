import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import fire from '../config/fire';

export default class SignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            Username: '',
            Email: '',
            Password: '',
            Confirmpassword: '',
            errors: [],
            loading: false
        }
    }

    isFormEmpty = ({ Username, Email, Password, Confirmpassword }) => {
        return !Username.length || !Email.length || !Password.length || !Confirmpassword.length
    }

    passValid = ({ Password, Confirmpassword }) => {
        if (Password.length <= 6 || Confirmpassword.length <= 6) {
            return false;
        }
        else if (Password !== Confirmpassword) {
            return false;
        }
        else {
            return true;
        }
    }

    displayErrors = errors => errors.map((error, i) => <h2 key={i}>{error.message}</h2>)

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    validation = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            error = { message: 'Fill in all feilds' };
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        else if (!this.passValid(this.state)) {
            error = { message: 'Password is invalid' };
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        else {
            return true;
        }
    }

    handleInputError = (errors, InputValue) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(InputValue)
        )
            ? 'error'
            : ''
    }

    handlesubmit = (e) => {
        e.preventDefault();
        if (this.validation()) {
            this.setState({ error: [], loading: true })
            fire.auth().createUserWithEmailAndPassword(this.state.Email, this.state.Password)
                .then(createdUser => {
                    console.log(createdUser)
                    this.setState({ loading: false })
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ errors: this.state.errors.concat(err), loading: false })
                });
        }
    }

    render() {
        return (
            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column textAlign="center" style={{ maxWidth: 450, marginTop: 150 }} >
                    <Icon name='registered' size="huge" color='blue' />
                    <Header as='h1' textAlign='center'>
                        Register
                    </Header>
                    <Form>
                        <Segment>
                            <h2 color='red' > {this.state.errors[0] && this.state.errors[0].message} </h2>
                            <Form.Input
                                fluid name='Username'
                                type='text' icon='user'
                                iconPosition='left'
                                placeholder='username'
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                className={this.handleInputError(this.state.errors, 'Email')}
                                fluid name='Email'
                                type='email' icon='mail'
                                iconPosition='left'
                                placeholder='xyz@example.com'
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                className={this.handleInputError(this.state.errors, 'Password')}
                                fluid name='Password'
                                type='password' icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                className={this.handleInputError(this.state.errors, 'Password')}
                                fluid name='Confirmpassword'
                                type='password' icon='repeat'
                                iconPosition='left'
                                placeholder='Re-enter password'
                                onChange={this.handleChange}
                            />
                            <Button
                                disabled={this.state.loading}
                                className={this.state.loading ? 'loading' : ''} onClick={this.handlesubmit}
                                color='blue'>
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already a User ?
                        <Link to='/login'>Login <Icon name='sign in' color='grey' /> </Link>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}