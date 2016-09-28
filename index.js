'use strict';

const ruleset = (appName) => require('fs').readdirSync(`${__dirname}/rules/${appName}`).filter((file) => {
  return !/index|DS_Store/.test(file);
}).reduce((list, file) => {
  let rules = {};
  let name = file.replace('.js', '');
  let contents = require(`./rules/${appName}/${name}`);

  rules[name] = contents;

  return Object.assign(list, rules);
}, {});

const rules = {
  'evw-self-serve': ruleset('evw-self-serve')
};

module.exports = rules;
