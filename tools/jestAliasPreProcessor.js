/* eslint-disable no-undef, no-console, max-statements, import/no-extraneous-dependencies */
const babelJest = require('babel-jest');
const transform = require('transform-jest-deps');
const {resolve} = require('./webpackAliasResolver');

const getWebpackAliasPreprocessor = () => ({
    process(src) {
        return transform(src, resolve);
    }
});

module.exports = {
    process(src, filePath) {
        return getWebpackAliasPreprocessor().process(babelJest.process(src, filePath), filePath);
    }
};
