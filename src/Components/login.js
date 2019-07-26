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

    handlesubmit = (e) => {
            e.preventDefault();
            fire.auth().signInWithEmailAndPassword(this.state.Email, this.state.Password)
            .then(signedInUser => {
            console.log(signedInUser)
            })
            .catch(err =>{
            console.error(err);
            });
    }

    render() {
        return (
            <Grid textAlign='center' verticalAlign='middle'>
                <GridColumn style={{ maxWidth: 450, marginTop: 150 }}>
                    <Header as='h1' textAlign='center'>
                        <Icon name='code branch' color='blue' />
                        Login
                    </Header>
                    <Form>
                        <Segment>
                            <Form.Input fluid name='Email' type='email' icon='mail' iconPosition='left' placeholder='xyz@example.com' onChange={this.handleChange} />
                            <Form.Input fluid name='Password' type='password' icon='lock' iconPosition='left' placeholder='Password' onChange={this.handleChange} />
                            <Button onClick={this.handlesubmit} color='blue'>Login</Button>
                        </Segment>
                    </Form>
                    <Message>Don't have an acount? <Link to='/signup'>Signup <Icon name='sign in' color='grey' /> </Link> </Message>
                </GridColumn>
            </Grid>
        )
    }
}