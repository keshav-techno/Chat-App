import React from 'react';
import {Sidebar, Menu, Divider, Button} from 'semantic-ui-react'

export default class ColorPanel extends React.Component {
    render(){
        return(
            <Sidebar as={Menu} icon='labeled' inverted vertical visible width='thin'>
                <Divider/>
                <Button icon='add' size='medium' color='blue'  />
            </Sidebar>
        )
    }
}