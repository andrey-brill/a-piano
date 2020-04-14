
const { umd } = require('a-webpack-configs');


module.exports = (env) => umd(env, {

    entryPath: './site/modules/modules.js',
    productionPath: './docs',
    developmentPath: './site/spa',

    plugins: {
        clean: true,
        babel: true,
        react: true
    }
});
