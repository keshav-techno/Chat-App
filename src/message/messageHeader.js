import React from 'react';
import {Header, Segment, Input, Icon}  from 'semantic-ui-react';
import HeaderSubHeader from 'semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader';

export default class MessagHeader extends React.Component{

    render(){
        return(
            <Segment clearing>

            {/* Channel tittle */}
                <Header fluid='true' as='h2' floated='left' style={{marginBottom: 0}}>
                    <span>
                        Channel
                    <Icon name={'star outline'} color='blue' />
                    </span>
                    <HeaderSubHeader>
                        2 user
                    </HeaderSubHeader>
                </Header>

            {/* Channel search Input */}
                <Header floated='right'> 
                    <Input size='small' icon='search' name='searchTerm' placeholder='Search Messages'/>
                </Header>
            </Segment>
            
        )
    }
}