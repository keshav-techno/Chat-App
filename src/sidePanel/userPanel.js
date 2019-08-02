import React from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import fire from '../config/fire';
import Channels from './chanels';

class UserPanel extends React.Component {

    state = {
        user: this.props.currentUser
    }


    dropdownOptions = () => [
        {
            key: 'user',
            text: <span>Signed in as a <strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Change Avatar</span>
        },
        {
            key: 'signout',
            text: <span onClick={this.handleSignOut} >Sign Out</span>
        }
    ]

    handleSignOut = () => {
        fire.auth().signOut().then(() => console.log('Signed out'));
    }

    render() {
        console.log(this.props.currentUser);
        const { user } = this.state
        const {currentUser} = this.props;


        return (
            <Grid style={{ background: '#4c3c4c' }} >
                <Grid.Column>
                    <Grid.Row style={{ padding:'1.2em', margin: 0 }}>
                        {/* App Header */}
                        <Header inverted floated='left' as='h2' >
                            <Icon name='code' />
                            <Header.Content>Chat App</Header.Content>
                        </Header>
                    </Grid.Row>

                    <Header style={{ padding: '0.25em' }} as='h4' inverted>
                        <Dropdown 
                        trigger={
                            <span>
                                <Image src={user.photoURL} spaced='right' avatar />
                                {user.displayName}
                            </span>
                        } options={this.dropdownOptions()} />
                    </Header>
                    <Channels currentUser={currentUser} />
                </Grid.Column>
            </Grid>
        )
    }
}

export default UserPanel;