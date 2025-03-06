import React, {useEffect, useState} from 'react';
import styles from './styles.css';
import classNames from 'classnames';

type TabsProps = {
    activeTabIndex: number
    tabs: {
        title: string,
        content: React.ReactNode
    }[]
}

type Props<T> = {
    data: { value: T, id: number } []
}

const List: <T extends string | number>(props: Props<T>) => React.ReactElement<Props<T>> =({ data }) => {
    return (
        <ul>{data.map(row => <li key={row.id}>{row.value}</li>)}</ul>
    );
};

const withState = <T extends number>(Component: React.FC<Props<T>>) => {
    return () => {
        const [state, setState] = useState<{value: number, id: number}[]>([]);
        useEffect(() => {
            setTimeout(() => {
                setState([...state, { value: 1, id: Date.now() }]);
            }, 1000);

        }, [state]);

        return <Component data={state as { value: T, id: number } []} />;
    };
};


export const Tabs: React.FC<TabsProps> = ({ tabs, activeTabIndex }) => {
    const index = activeTabIndex >= tabs.length ? tabs.length - 1 : activeTabIndex < 0 ? 0 : activeTabIndex;
    const onTabClick = (index: number) => () => {
        alert(index);
    };

    const ListWithState = withState(List<number>);

    return <>
            <ListWithState />
            <List<number> data={[{value: 1, id: 2}]}/>
            <div className={styles.controls}>
                {tabs.map((tab, index) => {
                    return <Tab onClick={onTabClick(index)} key={tab.title} type={index === activeTabIndex ? 'active' : 'normal'}>{tab.title}</Tab>;
                })}
            </div>
            <div className={styles.content}>
                {tabs[index].content}
            </div>
        </>;
};


type TabProps = {
    children: React.ReactNode
    type: 'active' | 'normal'
    onClick: () => void
}

export const Tab: React.FC<TabProps> = ({children, type, onClick}) => {
    return <button onClick={onClick} className={classNames(
        styles.tab,
        {
            [styles.tabActive]: type === 'active'
        }
    )}>{children}</button>;
};
