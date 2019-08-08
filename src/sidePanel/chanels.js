import React from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setCurrentChannel } from '../actions';
import fire from '../config/fire';

class Channels extends React.Component {

    state = {
        activeChannel: '',
        user: this.props.currentUser,
        channels: [],
        channelName: '',
        channelDetails: '',
        channelsRef: fire.database().ref('channels'),
        modal: false,
        firstLoad: true
    };

    componentDidMount() {
        this.addListner();
    }

    componentWillMount () {
        this.removeListner();
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
                this.setState({ channelName: '', channelDetails: ''});
                this.closeModal();
                console.log('channel added');
                console.log(key)
            }).catch(err => {
                console.error(err);
            })
    }

    addListner = () => {
        let loadedChannels = [];
        this.state.channelsRef.on('child_added', snap => {
            loadedChannels.push(snap.val());
            console.log(loadedChannels);
            this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
        });
    }

    changeChannel = channel => {
        this.setActivateChannel(channel);
        this.props.setCurrentChannel(channel);
    };

    displayChannels = channels => (
        channels.length > 0 && channels.map(channel => (
            <Menu.Item
                key={channels.id}
                onClick={() => this.changeChannel(channel)}
                name={channels.name}
                style={{ opacity: '0.7' }}
                active={channel.id === this.state.activeChannel}
            >
                #{channel.name}
                {/* console.log({channels.name}); */}
            </Menu.Item>
        ))
    )

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

    isFormValid = ({ channelName, channelDetails }) => channelName
        && channelDetails

    openModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });

    removeListner = () => {
        this.state.channelsRef.off();
        
    }

    setActivateChannel = channel => {
        this.setState({ activeChannel: channel.id });

    }

    setFirstChannel = () => {
        const firstChannel = this.state.channels[0];
        if (this.state.firstLoad && this.state.channels.length > 0) {
            this.props.setCurrentChannel(firstChannel);
            this.setActivateChannel(firstChannel);
        }
        this.setState({ firstLoad: false });
    };

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
                    {this.displayChannels(channels)}
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

export default connect(null, { setCurrentChannel }
)(Channels);