import React from 'react';
import { Segment, Comment } from 'semantic-ui-react'
import fire from '../config/fire';
import MessageHeader from './messageHeader'
import MessageForm from './messageSubmit';
import { MessageView } from './messageView';

export default class Message extends React.Component {
    state = {
        messageRef: fire.database().ref('messages'),
        message: [],
        messageLoading: true,
        channel: this.props.currentChannel,
        user: this.props.currentUser,
    }

    componentDidMount() {
        const { channel, user } = this.state

        if (channel && user) {
            this.addListner(channel.id);
        }
    }

    addListner = (channelId) => {
        this.addMessageListner(channelId)
    }

    addMessageListner = (channelId) => {
        let loadedMessage = [];
        this.state.messageRef.child(channelId).on('child_added', snap => {
            loadedMessage.push(snap.val());
            this.setState({
                message: loadedMessage,
                messageLoading: false,
            })
        })
    }

    render() {
        const { messageRef, channel, user } = this.state;
        return (
            <React.Fragment>
                <MessageHeader />
                <Segment>
                    <Comment.Group className='messages'>
                    {this.state.message.map(item => {
                        return (
                            <MessageView
                                key={item.timestamp}
                                message={item}
                                user={this.state.user}
                            />
                        )
                    })}
                    </Comment.Group>
                    <MessageForm
                        messageRefs={messageRef}
                        currentChannel={channel}
                        currentUser={user}
                    />
                </Segment>  
            </React.Fragment>
        )
    }
}