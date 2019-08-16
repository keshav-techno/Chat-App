import React from 'react';
import moment from 'moment';
import { Comment } from 'semantic-ui-react'

const isOwnMessage = (message, user) => {
    return message.user.id === user.uid ?
        'message_self' :
        '';
}

const timeFromNow = (timestamp) => moment(timestamp).fromNow();

export const MessageView = (message, user) => {
    console.log(message,user);
    return (
        <Comment>
            <Comment.Avatar src={message.message.user.avatar} />
            <Comment.Content className={isOwnMessage(message, user)} >
                <Comment.Author as="a" >
                    {message.message.user.name}
                </Comment.Author>
                <Comment.Metadata>
                    {timeFromNow(message.message.timestamp)}
                </Comment.Metadata>
                <Comment.Text>
                    {message.message.content}
                </Comment.Text>
            </Comment.Content>
        </Comment>
    )
}