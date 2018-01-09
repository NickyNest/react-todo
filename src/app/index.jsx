import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import root from 'lodash._root';
import MainPage from 'containers/MainPage';
import './index.css';

render(
    <MainPage />,
    root.document.getElementById('root')
);
