import React, {useState} from 'react';
import styles from './styles.css';
import classNames from 'classnames';

type TabsProps = {
    activeTabIndex: number
    tabs: {
        title: string,
        content: React.ReactNode
    }[]
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTabIndex }) => {
    const index = activeTabIndex >= tabs.length ? tabs.length - 1 : activeTabIndex < 0 ? 0 : activeTabIndex;
    const [tabIndex, setTabIndex] = useState(index);

    const onTabClick = (index: number) => () => {
        setTabIndex(index);
    };

    return <div className={styles.wrapper}>
            <div className={styles.controls}>
                {tabs.map((tab, index) => {
                    return <Tab onClick={onTabClick(index)} key={tab.title} type={index === tabIndex ? 'active' : 'normal'}>{tab.title}</Tab>;
                })}
            </div>
            <div className={styles.content}>
                {tabs[tabIndex].content}
            </div>
        </div>;
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
