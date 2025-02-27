import {Login} from '../Components/Login/Login';

import type {Meta, StoryObj} from '@storybook/react';



const meta: Meta<typeof Login> = {
    component: Login,
    tags: ['autodocs'],
    title: 'Example/LogIn',
    args: {
        isLogged: false
    }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Logged: Story = {
    args: {
        isLogged: true
    }
};

export const NotLogged: Story = {
    args: {
        isLogged: false
    }
};

