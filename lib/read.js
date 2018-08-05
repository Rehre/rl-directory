const fs = require('fs');
const readline = require('readline');

let totalLine = 0;

function read(ext, directory) {
  let files = [];

  try {
    files = fs.readdirSync(directory);
    
    files.forEach(file => {
      const stat = fs.statSync(`${directory}\\${file}`);

      if (stat.isDirectory()) {
        read(ext, `${directory}\\${file}`);
      }

      if (stat.isFile()) {
        const regex = `${ext}$`; 
        const Regex = new RegExp(regex);

        if (`${directory}\\${file}`.search(Regex) > -1) {
          const rl = readline.createInterface({
            input: fs.createReadStream(`${directory}\\${file}`),
          });        

          let totalLineFile = 0;
          rl.on('line', () => totalLineFile++);
          rl.on('close', () => {
              totalLine += totalLineFile;
              console.log(`Total line on ${directory}\\${file}: ${totalLineFile}`);
              console.log(`Total line: ${totalLine}`);
          });
        }
      }
    });
  } catch (err) {
      console.error(err);
  }
}

module.exports = read;