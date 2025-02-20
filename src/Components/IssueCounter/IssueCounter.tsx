import React  from 'react';
import styles from './styles.css';
import classNames from 'classnames';

type IssueCounterProps = {
    title: string
    counter: number
    isActive: boolean
    kind: 'issue' | 'solved'
}

export const IssueCounter: React.FC<IssueCounterProps> = ({ title, counter, isActive, kind }) => {
    return <div className={classNames(styles.issueCounter, {
        [styles.issueCounterActive]: isActive,
    })}>
        <span className={styles.title}>{title}</span>
        <span className={classNames(styles.counter, {
            [styles.counterSolved]: kind === 'solved',
        })}>{counter}</span>

    </div>;
};
