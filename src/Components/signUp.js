import React from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import fire from '../config/fire';


export default class SignUp extends React.Component{
    constructor(){
        super()
        this.state={
            Username:'',
            Email:'',
            Password:'',
            Confirmpassword:'',
            errors:[]
        }
    }

    validation=() =>{
        let errors=[];
        let error;

        if(this.isFormEmpty(this.state)){
            error={message: 'Fill in all feilds'};
            this.setState({errors: errors.concat(error)});
            return false;
        }
        else if(this.passValid(this.state)){
            error={message: 'Password is invalid'};
            this.setState({errors: errors.concat(error)});
            return false;
        }
        else{
            return true;
        }
    }

    isFormEmpty =({Username, Email, Password, Confirmpassword}) =>{
        return !Username.length || !Email.length || !Password.length || !Confirmpassword.length

    }

    passValid=({Password, Confirmpassword}) => {
       if(Password.length<6 || Confirmpassword.length<6){
        return false;
       }
       else if(!Password === Confirmpassword){
           return false;
       }
       else {
           return true;
        }
    }

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p> ) 

    handleChange= (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handlesubmit = (e) => {
        if(this.validation()){
            e.preventDefault();
            fire.auth().createUserWithEmailAndPassword(this.state.Email, this.state.Password)
            .then(createdUser => {
            console.log(createdUser)
            })
            .catch(err =>{
            console.error(err);
            });
        }
    }

    render(){
        return(
            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={{maxWidth :450, marginTop: 150}} >
                    <Header>
                        <Icon name='save' color='blue' />
                    </Header>
                    <Form>
                        <Segment>
                            {this.state.errors[0] && this.state.errors[0].message}
                            <Form.Input fluid name='Username' type='text' icon='user'iconPosition='left' placeholder ='username' onChange={this.handleChange} />
                            <Form.Input fluid name='Email' type='email' icon='mail'iconPosition='left' placeholder ='xyz@example.com' onChange={this.handleChange} />
                            <Form.Input fluid name='Password' type='password' icon='lock'iconPosition='left' placeholder ='Password' onChange={this.handleChange} />
                            <Form.Input fluid name='Confirmpassword' type='password' icon='repeat'iconPosition='left' placeholder ='Re-enter password' onChange={this.handleChange} />
                            <Button onClick={this.handlesubmit} color='blue'>Submit</Button>
                        </Segment>
                    </Form>
                    <Message>Already a User ? <Link to='/login'>Login <Icon name='sign in' color='grey' /> </Link> </Message>
                </Grid.Column>
            </Grid>
        )
    }
}