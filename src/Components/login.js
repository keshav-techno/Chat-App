import React from 'react';
import fire from '../config/fire';
import { Grid, Form, Segment, Button, Header, Message, Icon, GridColumn } from 'semantic-ui-react'
import { Link } from "react-router-dom";


export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: []
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleInputError = (errors, InputValue) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(InputValue)
        )
            ? 'error'
            : ''
    }

    isFormValid = ({ email, password }) => email && password;

    handlesubmit = (e) => {
        e.preventDefault();
        if (this.isFormValid(this.state)) {
            fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log(signedInUser)
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ errors: this.state.errors.concat(err), loading: false })

                });
        }

    }

    render() {
        const { errors, loading } = this.state;
        return (
            <div className="ca-container--alignCenter">
                <Grid textAlign='center' verticalAlign='middle'>
                    <GridColumn textAlign="center" largeScreen="5" widescreen="4">
                        <Header as='h1' textAlign='center'>
                            <Icon name='code branch' color='blue' />
                            Login
                    </Header>
                        <Form>
                            {errors[0] ? <Message color="red">{errors[0] && errors[0].message}</Message> : null}
                            <Segment>
                                <Form.Input
                                    fluid name='email'
                                    type='email'
                                    icon='mail'
                                    iconPosition='left'
                                    placeholder='xyz@example.com'
                                    className={this.handleInputError(errors, 'email')}
                                    onChange={this.handleChange}
                                />
                                <Form.Input fluid
                                    name='password'
                                    type='password'
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    className={this.handleInputError(errors, 'password')}
                                    onChange={this.handleChange}
                                />
                                <Button
                                    onClick={this.handlesubmit}
                                    color='blue'
                                    disabled={loading}
                                    className={loading ? "loading" : ""}
                                >
                                    Login
                                    </Button>
                            </Segment>
                        </Form>
                        <Message>Don't have an acount? <Link to='/signup'>Signup <Icon name='sign in' color='grey' /> </Link> </Message>
                    </GridColumn>
                </Grid>
            </div>
        )
    }
}