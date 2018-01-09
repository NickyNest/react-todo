/* eslint import/no-extraneous-dependencies:0, no-unused-vars:0 */

const Autoprefixer = require('autoprefixer');
const PostcssInitial = require('postcss-initial');
const cssnano = require('cssnano');

const debug = process.env.BABEL_ENV !== 'production';

const postCssConfig = [
    Autoprefixer({
        browsers: ['> 1%', 'last 2 versions'],
        cascade: false
    }),
    PostcssInitial({
        reset: 'inherited' // reset only inherited rules
    })
];

const cssNano = cssnano({
    discardComments: {
        removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true
});

const getPostCssConfig = () => {
    if (debug) {
        return {plugins: postCssConfig};
    }
    return {plugins: [...postCssConfig, cssNano] };
};