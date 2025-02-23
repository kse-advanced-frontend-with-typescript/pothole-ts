import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {Logo} from '../Components/Logo/Logo';
import {Header, HeaderLeft, HeaderRight} from '../Components/Header/Header';
import {IssueCounter} from '../Components/IssueCounter/IssueCounter';
import {Login} from '../Components/Login/Login';


const Demo: React.FC = () => {
    return <Header>
        <>
            <HeaderLeft>
                <Logo />
                <IssueCounter counter={84} title='Issues' kind='issue' isActive={false} />
                <IssueCounter counter={42} title='Solved' kind='solved' isActive={false} />
            </HeaderLeft>
            <HeaderRight>
                <Login isLogged={false} />
            </HeaderRight>
        </>
    </Header>;
};

const meta: Meta<typeof Logo> = {
    component: Demo,
    tags: ['autodocs'],
    title: 'Example/Header',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};



