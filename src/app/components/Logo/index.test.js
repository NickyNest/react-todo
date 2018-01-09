/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Logo from './index';

configure({adapter: new Adapter()});

describe('Logo', () => {
    it('Logo match expected snapshot', () => {
        expect(shallow(<Logo className='logo-class-name' alt='logo-alt-name' />)).toMatchSnapshot();
    });
});
