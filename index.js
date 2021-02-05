//create src directory
let fs = require('fs');
let createFolder = function(folderName) {
  let dir = './'+folderName;
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
};


const cli = function () {
  var yargs = require('yargs')
    .usage('Usage: $0 [command] [options]')
    .example('$0 m testModule -A', ' :generates all modules files ')
    .alias('m', 'module_name')
    .nargs('m', 1)
    .describe('m', 'generate module')
    .demandOption(['m'])
    .help('h')
    .alias('h', 'help')
    .option('allFiles', {
      alias: 'A',
      describe: 'create All module files',
    })

  var argv = yargs.argv;

  console.log(argv);
  createFolder('src')
  createFolder('src/'+argv.module_name)
  console.log(argv.module_name)
};

exports.cli = cli;
