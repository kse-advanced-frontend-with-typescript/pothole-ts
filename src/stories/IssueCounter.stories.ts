import type {Meta, StoryObj} from '@storybook/react';

import {Logo} from '../Components/Logo/Logo';
import {IssueCounter} from '../Components/IssueCounter/IssueCounter';

const meta: Meta<typeof IssueCounter> = {
    component: IssueCounter,
    title: 'Example/IssueCounter',
    args: {
        title: 'Issues',
        counter: 10
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        counter: 10,
        title: 'Issues'
    },
};
