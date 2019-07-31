import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

export const Spinner = () => (
    <Dimmer active >
            <Loader size='massive' content='Preparing Chat...' />
    </Dimmer>
)