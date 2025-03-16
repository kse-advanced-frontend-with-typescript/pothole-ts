import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Tabs} from '../Components/Tabs/Tabs';


const meta: Meta<typeof Tabs> = {
    component: Tabs,
    title: 'Example/Tabs',
    tags: ['autodocs'],
    args: {
        activeTabIndex: 0,
        tabs: [
            {
                title: 'Tab 1',
                content: <p>Hello from Tab 1</p>
            },
            {
                title: 'Tab 2',
                content: <p>Hello from Tab 2</p>
            }
        ]
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
