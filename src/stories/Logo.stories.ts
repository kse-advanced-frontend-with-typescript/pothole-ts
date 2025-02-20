import type {Meta, StoryObj} from '@storybook/react';

import {Logo} from '../Components/Logo/Logo';

const meta: Meta<typeof Logo> = {
    component: Logo,
    title: 'Example/Logo',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
