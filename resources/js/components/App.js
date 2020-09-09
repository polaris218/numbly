import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { store } from './reducers';
import routes from './routes';
import setRoutes from './config/routing';
import * as serviceWorker from './config/serviceWorker';
import getHistory from 'helpers/history';
import lockOrientation from 'helpers/orientation';
import processDevice from 'helpers/device';
import './styles/index.sass';
import '@fortawesome/fontawesome-free/js/all.js';

const target = document.querySelector('#app');
const history = getHistory();
lockOrientation();
processDevice();

const app = (
    <Router history={ history }>
        <Provider store={ store }>
            { setRoutes(routes, store) }
        </Provider>
    </Router>
);

ReactDOM.render(app, target);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
