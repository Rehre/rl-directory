#!/usr/bin/env node
'use strict';

const fs = require('fs');
const readline = require('readline');
const program = require('commander');
// commander config
program
  .name('rl-directory')
  .version('1.0.0', '-v, --version')
  .description('Read all files lines in directory');

program
  .command('read <ext> <directory>')
  .alias('r')
  .description('Read directory')
  .action((ext, directory) => {
    read(ext, directory);
  });

program.parse(process.argv);
// read line function
function read(ext, directory) {  
  const regexp = `\\.${ext}$`;
 
  let input = directory;
  let TotalLineCount = 0;
  let regex = new RegExp(regexp);
  // this will run as recursive function
  function ReadDirectoryLine(input, cb) {
    if(!input) {
      throw new Error('False Input');
    }
    
    let files = [];
    let Directories = (typeof input === 'string') ? [input] : [...input];

    files = fs.readdirSync(Directories[0]);

    files.forEach((item, index) => {
      const file = `${Directories[0]}\\${item}`;
      const stats = fs.statSync(file);
      let lineCount = 0;

      if(stats.isFile() && regex.test(file)) {
        const rl = readline.createInterface({
          input: fs.createReadStream(file), 
        });
        
        rl.on('line', () => {
            lineCount++;
        });

        rl.on('close', () => {
            console.log(`Total lines on ${file} : ${lineCount}`);
            TotalLineCount += lineCount;

            if(index === files.length - 1) {          
              if(Directories.length > 1) {
                  Directories.shift();
                  ReadDirectoryLine(Directories, cb);
              } else {
                  cb(TotalLineCount);
              }
            }
        });
      } else {
        if(stats.isDirectory()) Directories.push(file);

        if(index === files.length - 1) {          
          if(Directories.length > 1) {
              Directories.shift();
              ReadDirectoryLine(Directories, cb);
          } else {
              cb(TotalLineCount);
          }
        }
      }
    });
  }

  try {
    ReadDirectoryLine(input, (lines) => console.log(`Total Lines : ${lines}`));
  } catch(e) {
    console.error(e);
  }
}