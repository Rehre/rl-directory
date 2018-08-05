#!/usr/bin/env node
'use strict';

const program = require('commander');
const read = require('./lib/read');

// commander config
program
  .name('rl-directory')
  .version('2.0.0', '-v, --version')
  .description('Read all files lines in directory');

program
  .command('read <ext> <directory>')
  .alias('r')
  .description('Read directory')
  .action((ext, directory) => {
    read(ext, directory);
  });

program.parse(process.argv);
