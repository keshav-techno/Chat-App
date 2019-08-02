import React from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import fire from '../config/fire';

class Channels extends React.Component {

    state = {
        user: this.props.currentUser,
        channels: [],
        channelName: '',
        channelDetails: '',
        channelsRef: fire.database().ref('channels'),
        modal: false
    }

    componentDidMount(){
        this.setState({
            user : this.props.currentUser
        })
    }

    addChannel = () => {
        const { channelsRef, channelName, channelDetails, user } = this.state;

        const key = channelsRef.push().key;

        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        };
        
        
        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
            this.setState({ channelName: '', channelDetails: '' });
            this.closeModal();
            console.log('channel added');
            console.log(key)
        }).catch(err => {
            console.error(err);
        })
    }

    handlesubmit = (e) => {
        e.preventDefault();
        if (this.isFormValid(this.state)) {
            console.log('channel added');
            this.addChannel();
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    isFormValid = ({ channelName, channelDetails }) =>
        channelName && channelDetails

    openModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });


    render() {
        const { channels, modal } = this.state;
        return (
            <React.Fragment>
                <Menu.Menu style={{ paddingBotom: '2em' }} >
                    <Menu.Item>
                        <span>{" "}
                            <Icon name='exchange' /> CHANNELS
                        </span>
                        ({channels.length}) <Icon name='add' onClick={this.openModal} />
                    </Menu.Item>
                    {/* Channels */}
                </Menu.Menu>

                {/* Add channel modals */}
                <Modal basic open={modal} onClose={this.closeModal}>
                    <Modal.Header>
                        Add a Channel
                    </Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handlesubmit}>
                            <Form.Field>
                                <Input
                                    fluid
                                    label='Name of Channel'
                                    name='channelName'
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label='About the Channel'
                                    name='channelDetails'
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button color='green' inverted onClick={this.handlesubmit}>
                            <Icon name='checkmark' /> Add
                        </Button>
                        <Button color='red' inverted onClick={this.closeModal} >
                            <Icon name='remove' /> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Channels;