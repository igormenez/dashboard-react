import React from 'react';

import {Container,ToggleLabel,ToggleSelector} from './style';

const Toggle: React.FC = () =>(
    <Container>
        <ToggleLabel>Light</ToggleLabel>
        <ToggleSelector
            checked={false}
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={() => console.log('mudou')}
        />
        <ToggleLabel>Dark</ToggleLabel>
    </Container>
)

export default Toggle