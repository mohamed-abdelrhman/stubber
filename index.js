const {createFolder} = require("./helpers/files.helper");
const {ConvertFileNameToModuleName} = require("./helpers/string.helper");
const {mono} = require("./mono/mono");
const {microService} = require("./micro-service/micro-service");

const logColors={
  'module':'\x1b[31m',
  'repository':'\x1b[34m',
  'service':'\x1b[33m',
  'resolver':'\x1b[32m',
  'type':'\x1b[35m',
  'entity':'\x1b[34m',
  'interface':'\x1b[36',
  'input':'\x1b[37m',
}





const cli = async function () {
  var yargs = require('yargs')
      .usage('Usage: $0 [command] [options]')
      //mono examples
      .example('$0 g test-module -A', ' :generates all modules files ')
      .example('$0 g test-module -A -f', ' :generates all modules files  with crud operation')
      .example('$0 g test-module -e entity-name', ' :generate entity ')
      .example('$0 g test-module -s service-name', ' :generates service file')
      .example('$0 g test-module -s service-name -f', ' :generates service file with crud operation')
      .example('$0 g test-module -r repository-name', ' :generates repository file ')
      .example('$0 g test-module -r repository-name -f', ' :generates repository file with crud operation')
      .example('$0 g test-module -z resolver-name', ' :generates resolver file ')
      .example('$0 g test-module -z resolver-name -f', ' :generates resolver file  with crud operation')
      .example('$0 g test-module -t type-name', ' :generates type file ')
      .example('$0 g test-module -i input-name', ' :generates input file')
      .example('$0 g test-module -A --micro', ' :generates all files for microservice')
      .example('$0 g test-module -A --micro -f', ' :generates all files for microservice with crud operations')
      .example('$0 g test-module -c controller-name --micro', ' :generates controller')
      .example('$0 g test-module -c controller-name --micro -f', ' :generates all controller with crud')
      .example('$0 g test-module -s service-name --micro', ' :generates service')
      .example('$0 g test-module -s service-name --micro -f', ' :generates service with crud')
      .example('$0 g test-module -r repo-name --micro', ' :generates repo')
      .example('$0 g test-module -r repo-name --micro -f', ' :generates repo with crud')
      .example('$0 g test-module -d dto-name --micro', ' :generates dto file')
      .alias('g', 'module_name')
      .nargs('g', 1)
      .describe('g', 'generate module')

      .alias('A', 'all-files')
      .nargs('A', 0)
      .describe('A', 'generate All files')

      .alias('f', 'full-crude')
      .nargs('f', 0)
      .describe('f', 'include full crude operation')

      .alias('e', 'entity')
      .nargs('e', 1)
      .describe('e', 'generate entity')

      .alias('s', 'service')
      .nargs('s', 1)
      .describe('s', 'generate service')

      .alias('r', 'repository')
      .nargs('r', 1)
      .describe('r', 'generate repository')

      .alias('z', 'resolver')
      .nargs('z', 1)
      .describe('z', 'generate resolver')

      .alias('i', 'input')
      .nargs('i', 1)
      .describe('i', 'generate Input')

      .alias('t', 'type')
      .nargs('t', 1)
      .describe('t', 'generate type')

      .alias('c', 'controller')
      .nargs('c', 1)
      .describe('c', 'generate controller')
      .alias('d', 'dto')
      .nargs('d', 1)
      .describe('d', 'generate dto')

      .demandOption(['g'])
      .help('h')
      .alias('h', 'help')

  let argv = yargs.argv;
  if (argv.micro){
    await microService.call(argv)
  }else {
    await mono.call(argv)
  }
}





exports.cli = cli;
