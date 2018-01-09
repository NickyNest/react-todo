/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainPage from './index';

configure({adapter: new Adapter()});

describe('MainPage', () => {
    it('MainPage match expected snapshot', () => {
        expect(shallow(<MainPage />)).toMatchSnapshot();
    });
});
