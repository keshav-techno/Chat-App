import React from 'react';
import {Segment, Comment} from 'semantic-ui-react'
import MessageHeader from './messageHeader'
import MessageForm from './messageForm';

export default class Message extends React.Component{

    render(){
        return(
            <React.Fragment>
                <MessageHeader />
                <Segment>
                    <Comment.Group className='messages'>

                    </Comment.Group>
                </Segment>
                <MessageForm />
            </React.Fragment>
        )
    }
}