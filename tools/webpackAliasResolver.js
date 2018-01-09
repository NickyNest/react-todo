const path = require('path');
const config = require('../webpack.config.js');

const aliases = Object.keys(config.resolve.alias).map(key => {
    const value = config.resolve.alias[key];
    return {key, value};
});

const resolve = pathName => {
    for (let i = 0; i < aliases.length; i++) {
        const alias = aliases[i];
        const regex = new RegExp(`^${alias.key}$|^${alias.key}(\\/)`);

        if (regex.test(pathName)) {
            return path.normalize(pathName.replace(regex, `${alias.value}$1`)).replace(/\\/g, '/');
        }
    }

    return pathName;
};

module.exports = {resolve};