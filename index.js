//create src directory
let fs = require('fs');
let createFolder = function(folderName) {
  let dir = './'+folderName;
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
};

//stub path
let stubPath = function (type){
  return __dirname+'/stubs/Dummy.'+type+'.stub'
}

//file path
let filePath = function (type, folderName,fileName,subFolder='',){
  return 'src/models/'+folderName+'/'+subFolder+fileName+'.'+type+'.ts'
}

// copy files.
let copyStub = async function (type,filePath){
  fs.copyFile(stubPath(type), filePath, (err) => {
    if (err) throw err;
  });
}

//capitalize first letter
function deCapitalizeFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
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
  'type':'\x1b[34m',
  'entity':'\x1b[34m',
  'interface':'\x1b[34m',
  'input':'\x1b[34m',

}


const cli = function () {
  var yargs = require('yargs')
    .usage('Usage: $0 [command] [options]')
    .example('$0 m testModule -A', ' :generates all modules files ')
    .alias('g', 'module_name')
    .nargs('g', 1)
    .describe('g', 'generate module')
    .alias('i', 'create Input name')
    .nargs('i', 1)
    .describe('i', 'generate Input')

    .alias('t', 'generate type')
    .nargs('t', 1)
    .describe('t', 'generate type')
    .demandOption(['g'])
    .help('h')
    .alias('h', 'help')
    .option('files', {
      alias: 'f',
      describe: 'create All module files',
      choices: ['B', 'A']
    })

  let argv = yargs.argv;
  let moduleName = namePatternEnforce((argv.module_name).toLowerCase())
  let folderName = (argv.module_name).toLowerCase()

  createFolder('src')
  createFolder('src/models')
  createFolder('src/models/'+folderName)
  //create module

  if(argv.A){
    let fileName = (argv.module_name).toLowerCase();
    createFile(moduleName,folderName,fileName,fileTypes.module)
    createFile(moduleName,folderName,fileName,fileTypes.service)
    createFile(moduleName,folderName,fileName,fileTypes.repository)
    createFile(moduleName,folderName,fileName,fileTypes.resolver)
    createFile(moduleName,folderName,fileName,fileTypes.entity,'entities')
    createFile(moduleName,folderName,fileName,fileTypes.type,'types')
    createFile(moduleName,folderName,fileName,fileTypes.input,'inputs')
  }else if(argv.B){
     let fileName = (argv.module_name).toLowerCase();
    createFile(moduleName,folderName,fileName,fileTypes.module)
    createFile(moduleName,folderName,fileName,fileTypes.service)
    createFile(moduleName,folderName,fileName,fileTypes.repository)
    createFile(moduleName,folderName,fileName,fileTypes.resolver)
    createFile(moduleName,folderName,fileName,fileTypes.entity,'entities')
  }else if (argv.i){
    let fileName = (argv.i).toLowerCase()
    moduleName=namePatternEnforce(fileName)
    createFile(moduleName,folderName,fileName,fileTypes.input,'inputs')
  }else if (argv.t){
    let fileName = (argv.t).toLowerCase()
    moduleName=namePatternEnforce(fileName)
    createFile(moduleName,folderName,fileName,fileTypes.type,'types')
  }

};

let createFile= function (moduleName,folderName, fileName,type,subFolder=0){
  let file =filePath(type,folderName,fileName)
  if (subFolder){
    createFolder('src/models/'+folderName+'/'+subFolder)
    file =filePath(type,folderName,fileName,subFolder+'/')
  }
  copyStub(type, file).then(r =>{
    replaceDummyData(file,moduleName,fileName)
    console.log(logColors[type],fileName+'.'+type+'.ts created !')
  })
}





exports.cli = cli;
