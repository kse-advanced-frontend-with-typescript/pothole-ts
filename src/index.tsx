import React from 'react';
import ReactDOM, {Container} from 'react-dom/client';
import styles from './main.css';
import {initMapAPI} from './modules/clients/map';
import {initUserAPI} from './modules/clients/user';

const App: React.FC = () => {
    const a: string = 'World!';
    initUserAPI(process.env.API_KEY ?? '', fetch).getUserToken('admin', 'admin');
    return <div className={styles.text}>Hello, world! {a}{process.env.SOME_ANOTHER_VAR}</div>;
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as Container
);

//
root.render(<App />);
export {schemaErrorToError} from './modules/clients/schemaErrorToError';
export {convertToType} from './modules/clients/convertToType';
