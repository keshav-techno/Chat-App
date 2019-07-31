import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './userPanel';

export default class SidePanel extends React.Component{

    render(){
        return(
            <Menu size='large' inverted fixed='left' vertical style={{ backgroud: '#4c3c4c', fontSize: '1.2rem' }} >
                <UserPanel />
            </Menu>
        )
    }
}