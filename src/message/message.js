import React from 'react';
import {Segment, Comment} from 'semantic-ui-react'
import fire from '../config/fire';
import MessageHeader from './messageHeader'
import MessageForm from './messageForm';

export default class Message extends React.Component{
    state = {
            messageRef: fire.database().ref('messages'),
            channel: this.props.currentChannel,
            user: this.props.currentUser
        }
    
    render(){
        const {messageRef, channel, user} = this.state;
        return(
            <React.Fragment>
                <MessageHeader />
                <Segment>
                    <Comment.Group className='messages'>
                        {/* Message */}
                    </Comment.Group>
                </Segment>

                <MessageForm 
                    messageRefs= {messageRef}
                    currentChannel= {channel}
                    currentUser= {user}
                />
            </React.Fragment>
        )
    }
}