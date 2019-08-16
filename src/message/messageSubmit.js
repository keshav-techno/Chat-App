import React from 'react';
import {Segment, Button, Input, ButtonGroup} from 'semantic-ui-react';
import FileModal from './fileModal'
// import fire from '../config/fire';

export default class MessageForm extends React.Component{
    state= {
        message: '',
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        loading: false,
        errors: [],
        timestamp: Date.now(),
        modal: false
    }

    closeModal = () => this.setState({ modal: false })

    createMessage = () => {
        const message = {
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL,
            },
            content: this.state.message,
            timestamp: this.state.timestamp
        }
        return message;
    }

    handelChange =(e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    openModal = () => this.setState({ modal: true })

    sendMessage = () => {
        const {message, channel} = this.state
        const {messageRefs} = this.props;

        if(message) {
            // send message
            this.setState({loading: true});
            messageRefs
                .child(channel.id)
                .push()
                .set(this.createMessage())
            .then(() => {
                this.setState({ loading:false, message:'', errors:[] })
            })

            .catch(err => {
                console.error(err);
                this.setState({
                    loading: false,
                    errors: this.state.errors.concat(err)
                })
            })
        }
        else{
            this.setState({
                errors: this.state.errors.concat({ message:'Add a Message' })
            })
        }
    }

    render(){
        const {errors, message, loading, modal, } = this.state;
        return(
            <Segment>
                <Input fluid 
                name='message' 
                onChange= {this.handelChange}
                value= {message}
                style={{ marginBottom:'0.7em'}} 
                label={<Button icon={'add'}/>}
                labelPosition='left corner' 
                className={
                    errors.some(error => error.message.includes('message'))? 'error': ''
                }
                placeholder ='Write your message'
                />

                <ButtonGroup icon widths='2' >
                    <Button 
                    color='blue'
                    onClick={this.sendMessage}
                    disabled={loading}
                    content='Add Reply'
                    labelPosition='left'
                    icon='edit'
                    />
                    <Button 
                    color='teal'
                    onClick={this.openModal}
                    content='Upload Media'
                    labelPosition='right'
                    icon='cloud upload'
                    />
                    <FileModal 
                        modal={modal}
                        closeModal={this.closeModal}
                    />
                </ButtonGroup>
            </Segment>
        )
    }
}