import type {Meta, StoryObj} from '@storybook/react';

import {Map} from '../Components/Map/Map';

const meta: Meta<typeof Map> = {
    component: Map,
    title: 'Example/Map',
    args: {
        points: [
            {
                _id: 1,
                lat: -3.745,
                lng: -38.523
            }
        ]
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
