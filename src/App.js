import React from 'react';
import { Grid, Column } from 'semantic-ui-react';
import './App.css';
import { connect } from 'react-redux';
import ColorPanel from './colorPanel/colorPanel';
import Message from './message/message';
import SidePanel from './sidePanel/sidePanel';
import MetaPanel from './metaPanel/MetaPanel';

const App = ({ currentUser, currentChannel }) => (
  <Grid columns='equal' className='app' style={{ background: '#eee' }} >
    <ColorPanel />
    <SidePanel
      key={currentUser && currentUser.uid}
      currentUser={currentUser}
    />

    <Grid.Column style={{ marginLeft: 320 }} >
      <Message
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
      />
    </Grid.Column>

    <Grid.Column width={4} >
      <MetaPanel />
    </Grid.Column>
  </Grid>
)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel
})

export default connect(mapStateToProps)(App);