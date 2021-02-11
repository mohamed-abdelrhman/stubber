//create src directory
let fs = require('fs');
const {createFolder} = require("./helpers/files.helper");
const {ConvertFileNameToModuleName} = require("./helpers/string.helper");
const {mono} = require("./mono/mono");


//name pattern enforcement


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

      .demandOption(['g'])
      .help('h')
      .alias('h', 'help')

  let argv = yargs.argv;
  let moduleName = ConvertFileNameToModuleName((argv.module_name).toLowerCase())
  let folderName = (argv.module_name).toLowerCase()
  let fileName = (argv.module_name).toLowerCase()

  console.log(argv)
  //create Main folder
  await createFolder(folderName)
  let crud=false;
  if (argv.f) crud=true;
  if (argv.A){
    await mono.createAllMonoFiles(moduleName, folderName, fileName,crud)
  } else if (argv.i && typeof argv.i =='string'){
    let fileName = (argv.i).toLowerCase()
    moduleName=ConvertFileNameToModuleName(fileName)
    await mono.createInputFile(moduleName,folderName,fileName)
  }else if (argv.t&& typeof argv.t =='string'){
    let fileName = (argv.t).toLowerCase()
    moduleName=ConvertFileNameToModuleName(fileName)
    await mono.createTypeFile(moduleName,folderName,fileName)

  }else if (argv.s && typeof argv.s =='string'){
    let fileName = (argv.s).toLowerCase()
    moduleName=ConvertFileNameToModuleName(fileName)
    await mono.createServiceFile(moduleName,folderName,fileName, crud)

  }else if (argv.r&& typeof argv.s =='string'){
    let fileName = (argv.r).toLowerCase()
    moduleName=ConvertFileNameToModuleName(fileName)
    await mono.createRepositoryFile(moduleName,folderName,fileName, crud)

  }else if (argv.z && typeof argv.z =='string'){
    let fileName = (argv.z).toLowerCase()
    moduleName=ConvertFileNameToModuleName(fileName)
    await mono.createResolverFile(moduleName,folderName,fileName, crud)
  }
  else if (argv.e && typeof argv.e =='string'){
    let fileName = (argv.e).toLowerCase()
    moduleName=ConvertFileNameToModuleName(fileName)
    await mono.createEntityFile(moduleName,folderName,fileName)
  }
}





exports.cli = cli;
