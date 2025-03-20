import {Tabs} from '../../Components/Tabs/Tabs';
import React from 'react';

export const IndexPage: React.FC = () => {
    return <div>
        <Tabs activeTabIndex={0} tabs={[
            {
                title: 'Tab 1',
                content: <p>Hello from Tab 1</p>
            },
            {
                title: 'Tab 2',
                content: <p>Hello from Tab 2</p>
            }
        ]}></Tabs>
    </div>;
};
