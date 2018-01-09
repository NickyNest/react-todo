import React from 'react';
import {string} from 'prop-types';
import logo from 'images/logo.svg';

const Logo = ({className, alt}) => <img src={logo} className={className} alt={alt} />;

Logo.propTypes = {
    className: string,
    alt: string
};
Logo.defaultProps = {
    className: '',
    alt: ''
};

export default Logo;
