import React from 'react';
import { Grid, GridColumn, GridRow, Header, HeaderContent, Icon, Dropdown } from 'semantic-ui-react';

export default class UserPanel extends React.Component{

    render(){
        return(
            <Grid style={{ background: '#4c3c4c'}} >
                <GridColumn>
                    <GridRow style={{padding: '1.2em', margin: 0}}>
                        <Header inverted floated='left' as='h2' >
                            <Icon name='code' />
                            <HeaderContent>Chat App</HeaderContent>
                        </Header>
                    </GridRow>
                    <Header style={{ padding:'0.25em'}} as='h4' inverted>
                        <Dropdown />
                    </Header>
                </GridColumn>
            </Grid>
        )
    }
}