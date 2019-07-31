import React from 'react';
import {Grid, GridColumn} from 'semantic-ui-react';
import './App.css';
import ColorPanel from './colorPanel/colorPanel';
import Message from './message/message';
import SidePanel from './sidePanel/sidePanel';
import MetaPanel from './metaPanel/MetaPanel';

const App = () => (
  <Grid columns='equal' className='app' style={{background: '#eee'}} >
    <ColorPanel />
    <SidePanel />
    
    <GridColumn style={{marginLeft:320}} >
      <Message />
    </GridColumn>

    <GridColumn width={4} >
      <MetaPanel />
    </GridColumn>
  </Grid>
)

export default App;

// export default class App extends React.Component{

//   render(){
//     return(
//       <div>
//         app
//       </div>
//     )
//   }
// }
  
