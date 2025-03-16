import React from 'react';
import ReactDOM, {Container} from 'react-dom/client';
import styles from './main.css';
import {initMapAPI} from './modules/clients/map';

const App: React.FC = () => {
    const a: string = 'World!';
    // initMapAPI(process.env.API_KEY ?? '', fetch).getDetails('66361825726cae080000c37a')
    return <div className={styles.text}>Hello, world! {a}{process.env.SOME_ANOTHER_VAR}</div>;
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as Container
);

//
root.render(<App />);
