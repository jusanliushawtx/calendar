/**
 * Created by 吴天祥 on 2018/11/6 11:35
 * Develop by 吴天祥 on 2018/11/6 11:35
 */
const { injectBabelPlugin, getLoader, loaderNameMatches } = require('react-app-rewired');
const Path = require('path');
const deepcopy = require('deepcopy');

module.exports = {
  webpack: function override(config, env) {
    config = injectBabelPlugin(['import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }], config);

    // injectDevelopmentEntry(config, env);
    injectESLint(config, env);
    injectCSSModule(config, env);

    return config;
  },
  jest: function (config) {
    injectJestConfig(config);
    return config;
  },
};

function injectJestConfig(config) {
  if (!config.moduleNameMapper) {
    config.moduleNameMapper = {};
  }
  config.moduleNameMapper['\\.(css|less)$'] = 'identity-obj-proxy';

  if (!config.collectCoverageFrom) {
    config.collectCoverageFrom = [];
  }
  config.collectCoverageFrom = config.collectCoverageFrom.concat([
    '!src/index.js',
    '!src/debug.js',
    '!src/test/*',
    '!src/launcher.js',
    '!src/registerServiceWorker.js',
    '!src/**/DebugApp.jsx',
    '!src/**/*.mock.js'
  ]);

  if (!config.setupFiles) {
    config.setupFiles = [];
  }
  config.setupFiles = config.setupFiles.concat([
    'jest-localstorage-mock',
    '<rootDir>/test/setup.js',
  ]);

  config.setupTestFrameworkScriptFile = '<rootDir>/test/setupFramework.js';
}
function injectDevelopmentEntry(config, env) {
  if (env === 'development') {
    const reg = /[\/\\]index\.js$/;
    for (let i = 0; i < config.entry.length; i++) {
      if (reg.test(config.entry[i])) {
        config.entry[i] = config.entry[i].replace(reg, '/debug.js');
        break;
      }
    }
  }
}

function injectESLint(config) {
  for (let i = 0; i < config.module.rules.length; i++) {
    let rule = config.module.rules[i];
    if (rule.test && rule.test.source === '\\.(js|jsx|mjs)$' && rule.enforce === 'pre') {
      rule.use[0].options.eslintPath = Path.resolve(__dirname, './node_modules/eslint');
      rule.use[0].options.useEslintrc = true;
      rule.use[0].options.ignore = true;
      rule.use[0].options.baseConfig = false;
    }
  }
}

function injectCSSModule(config) {
  let cssLoader = getLoader(config.module.rules, (rule) => loaderNameMatches(rule, 'css-loader'));
  if (!cssLoader) {
    console.warn('css-loader not found');
    return;
  }

  for (let i = 0; i < config.module.rules.length; i++) {
    let rule = config.module.rules[i];
    if (rule.oneOf) {
      for (let j = 0; j < rule.oneOf.length; j++) {
        let one = rule.oneOf[j];
        if (one.test && one.test.source === '\\.css$') {
          let srcCss = one;
          let nodeModulesCss = deepcopy(srcCss);
          srcCss.exclude = [/node_modules/, /\.keep\.css/];
          nodeModulesCss.include = [/node_modules/, /\.keep\.css/];
          rule.oneOf.splice(j + 1, 0, nodeModulesCss);
          j += 1;
          break;
        }
      }
    }
  }

  if (!cssLoader.options) {
    cssLoader.options = {};
  }
  cssLoader.options.modules = true;
  cssLoader.options.sourceMap = true;
}
