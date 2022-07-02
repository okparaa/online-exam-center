import { h, FunctionComponent } from 'preact';
import Router from 'preact-router';
import { useState, useEffect, useRef } from 'preact/hooks';
import '../style.scss';
import tmoon from '../assets/tmoon.png';
import { StoreProvider, useAction, useSelector, useStore } from '@preact-hooks/unistore';
import { addMemory, toggle } from './parts/util';
import store from '../store';
import { Props } from './parts/types';
import Index from '../routes/index/index';
import Assmnts from '../routes/assmnts';
import Exam from '../routes/assmnts/exam';
import Exams from '../routes/assmnts/exams';
import A2b from '../routes/users/a2b';
import Dash from '../routes/users/dash';
import Okam from '../routes/users/okam';
import Footer from './parts/footer';
import Header from './parts/header';
import createAction from '../actions';

addMemory(store);

const App: FunctionComponent<Props> = props => {
    const [url, setUrl] = useState('');
    const actions = createAction(useStore())
    const updateStoreItems = useAction(actions.updateStoreItems);
    const appRef = useRef(null);

    const handleRoute = (e: any) => {
        setUrl(e.url);
    };
    useEffect(() => {
        updateStoreItems({ appRef: appRef.current });
    }, []);

    return (
        <div id="app" ref={appRef}>
            <div className="overlay"></div>
            <img style={{ position: 'absolute', visibility: 'hidden' }} src={tmoon} />
            <div onClick={toggle} id="schul">
                <Header url={url} />
                <Router onChange={handleRoute}>
                    <Index path="/" />
                    <Dash path="/users/dash" />
                    <Okam path="/users/okam" />
                    <A2b path="/users/a2b" />
                    <Assmnts path="/assmnts" />
                    <Exams path="/assmnts/exams" />
                    <Exam path="/assmnts/exam/:ida?" />
                </Router>
                <Footer url={url} />
            </div>
        </div>
    );
};

export default () => (
    <StoreProvider value={store}>
        <App />
    </StoreProvider>
);
