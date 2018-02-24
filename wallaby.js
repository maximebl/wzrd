var wallabyWebpack = require('wallaby-webpack');
var webpackConfig = require('./webpack.config.babel.js');

// removing babel-loader, we will use babel compiler instead, it's more performant
webpackConfig.module.rules = webpackConfig.module.rules.filter(function(l){
    return l.use !== 'babel-loader';
});

delete webpackConfig.devtool;

var wallabyPostprocessor = wallabyWebpack(webpackConfig);

module.exports = function (wallaby) {
    return {
        files: [
            // "src/**/*.js"
            {pattern: 'src/**/*.js', load: false}, {pattern: 'src/**/*.spec.js', ignore:true}
        ],

        tests: [
            // "spec/*.spec.js"
            {pattern:'src/**/*.spec.js', load: false}
        ],

        compilers: {
            '**/*.js': wallaby.compilers.babel()
        },
        env: {
            kind: 'chrome',
            type: 'browser',
            // runner: 'chrome',
        },
        postprocessor: wallabyPostprocessor,
        // debug:true,

        setup: function () {
            // required to trigger test loading
            window.__moduleBundler.loadTests();
        }
    };
};