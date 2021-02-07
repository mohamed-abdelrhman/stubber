//create src directory
let fs = require('fs');
let createFolder = function(folderName) {
  let dir = './'+folderName;
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
};

//stub path
let stubPath = function (type,crud){
  if (crud){
    return __dirname+'/stubs/crud/Dummy.'+type+'.stub'
  }
  return __dirname+'/stubs/Dummy.'+type+'.stub'
}

//file path
let filePath = function (type, folderName,fileName,subFolder='',){
  return 'src/models/'+folderName+'/'+subFolder+fileName+'.'+type+'.ts'
}

// copy files.
let copyStub = async function (type,filePath,crud){
  fs.copyFile(stubPath(type,crud), filePath, (err) => {
    if (err) throw err;
  });
}

//deCapitalize first letter
function deCapitalizeFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}
//capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
//replace dummy data
let replaceDummyData=function (file, moduleName, fileName) {
  fs.readFile(file, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let result = data.replace(/Dummy/g, moduleName).replace(/dummy/g,deCapitalizeFirstLetter(moduleName)).replace(/fileName/g,fileName);
    fs.writeFile(file, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  })
}

//name pattern enforcement
let namePatternEnforce = function (name) {
  const words = name.split("-");
  return words.map((word) => {
    return word[0].toUpperCase() + word.substring(1);
  }).join("")



}
const fileTypes={
  'module':'module',
  'repository':'repository',
  'service':'service',
  'resolver':'resolver',
  'type':'type',
  'entity':'entity',
  'interface':'interface',
  'input':'input',
}

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


const cli = function () {
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

      .alias('A', 'all files')
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

      .alias('i', 'name')
      .nargs('i', 1)
      .describe('i', 'generate Input')

      .alias('t', 'type')
      .nargs('t', 1)
      .describe('t', 'generate type')

      .demandOption(['g'])
      .help('h')
      .alias('h', 'help')


  let argv = yargs.argv;
  let moduleName = namePatternEnforce((argv.module_name).toLowerCase())
  let folderName = (argv.module_name).toLowerCase()

  createFolder('src')
  createFolder('src/models')
  createFolder('src/models/'+folderName)

  //create module
  let crud = false;
  argv.f?crud=true:false;
  if(argv.A){
    let fileName = (argv.module_name).toLowerCase();
    createFile(moduleName,folderName,fileName,fileTypes.module)
    createFile(moduleName,folderName,fileName,fileTypes.service,crud)
    createFile(moduleName,folderName,fileName,fileTypes.repository,crud)
    createFile(moduleName,folderName,fileName,fileTypes.resolver,crud)
    createFile(moduleName,folderName,fileName,fileTypes.entity,false,'entities')
    createFile(moduleName,folderName,fileName,fileTypes.type,false,'types')

    //generate createDummy
    createInputName= 'create-'+fileName
    createFile(namePatternEnforce(createInputName),folderName,createInputName,fileTypes.input,false,'inputs')
    updateInputName= 'update-'+fileName
    createFile(namePatternEnforce(updateInputName),folderName,updateInputName,fileTypes.input,false,'inputs')
    getInputName= 'get-'+fileName
    createFile(namePatternEnforce(getInputName),folderName,getInputName,fileTypes.input,false,'inputs')
    deleteInputName= 'delete-'+fileName
    createFile(namePatternEnforce(deleteInputName),folderName,deleteInputName,fileTypes.input,false,'inputs')
  }else if (argv.i){
    let fileName = (argv.i).toLowerCase()
    moduleName=namePatternEnforce(fileName)
    createFile(moduleName,folderName,fileName,fileTypes.input,false,'inputs')
  }else if (argv.t){
    let fileName = (argv.t).toLowerCase()
    moduleName=namePatternEnforce(fileName)
    createFile(moduleName,folderName,fileName,fileTypes.type,false,'types')
  }else if (argv.s){
    let fileName = (argv.s).toLowerCase()
    moduleName=namePatternEnforce(fileName)
    createFile(moduleName,folderName,fileName,fileTypes.service,crud)
  }else if (argv.r){
    let fileName = (argv.r).toLowerCase()
    moduleName=namePatternEnforce(fileName)
    createFile(moduleName,folderName,fileName,fileTypes.repository,crud)
  }else if (argv.z){
    let fileName = (argv.z).toLowerCase()
    moduleName=namePatternEnforce(fileName)
    createFile(moduleName,folderName,fileName,fileTypes.resolver,crud)
  }
  else if (argv.e){
    let fileName = (argv.e).toLowerCase()
    moduleName=namePatternEnforce(fileName)
    createFile(moduleName,folderName,fileName,fileTypes.entity)
  }
};

let createFile= function (moduleName,folderName, fileName,type,crud,subFolder=0){
  let file =filePath(type,folderName,fileName)
  if (subFolder){
    createFolder('src/models/'+folderName+'/'+subFolder)
    file =filePath(type,folderName,fileName,subFolder+'/')
  }
  copyStub(type, file,crud).then(r =>{
    replaceDummyData(file,moduleName,fileName)
    console.log(logColors[type],fileName+'.'+type+'.ts created !')
  })
}





exports.cli = cli;
