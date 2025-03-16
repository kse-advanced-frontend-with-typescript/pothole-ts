import type {Meta, StoryObj} from '@storybook/react';

import {IssueCounter} from '../Components/IssueCounter/IssueCounter';

const meta: Meta<typeof IssueCounter> = {
    component: IssueCounter,
    title: 'Example/IssueCounter',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        title: 'Issues',
        counter: 10
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const IssueActive: Story = {
    args: {
        counter: 10,
        title: 'Issues',
        isActive: true,
        kind: 'issue'
    },
};

export const IssueInactive: Story = {
    args: {
        counter: 10,
        title: 'Issues',
        isActive: false,
        kind: 'issue'
    },
};

export const SolvedActive: Story = {
    args: {
        counter: 10,
        title: 'Issues',
        isActive: true,
        kind: 'solved'
    },
};

export const SolvedInactive: Story = {
    args: {
        counter: 10,
        title: 'Issues',
        isActive: false,
        kind: 'solved'
    },
};
