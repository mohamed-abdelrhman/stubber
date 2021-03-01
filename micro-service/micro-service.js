const { createFile, createFolder } = require("../helpers/files.helper");
const {ConvertFileNameToModuleName} = require("../helpers/string.helper");

const fileTypes={
  'module':'module',
  'repository':'repository',
  'service':'service',
  'controller':'controller',
  'dto':'dto',
  'entity':'entity',
}


const call = async function (argv) {
  let moduleName = ConvertFileNameToModuleName((argv.moduleName).toLowerCase())
  let folderName = (argv.moduleName).toLowerCase()
  let fileName = (argv.moduleName).toLowerCase()
  //create Main folder
  await createFolder('src')
  await createFolder('src/models/')
  await createFolder('src/models/'+folderName)
  let crud=argv.crud;
  let spec=false;
  if (argv.spec) spec=true;
  createModuleFile(moduleName,folderName,fileName,crud)
  createServiceFile(moduleName,folderName,fileName,crud,spec)
  createRepositoryFile(moduleName,folderName,fileName,crud)
  createControllerFile(moduleName,folderName,fileName,crud,spec)
  createEntityFile(moduleName,folderName,fileName,crud)
  createDtoFile(moduleName,folderName,fileName,crud)



}
const createModuleFile =  function(moduleName,folderName,fileName,crud=false){
  let stubType='/singles'
  if (crud)stubType='/crud';
  let stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.module+'.stub'
  createFile(fileTypes.module,moduleName,folderName,fileName,stubPath)
}
const createServiceFile =  function(moduleName,folderName,fileName,crud=false,spec=false){
  let stubType='/singles'
  if (crud)stubType='/crud';
  let stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.service+'.stub'
  createFile(fileTypes.service,moduleName,folderName,fileName,stubPath)
  if (spec){
    let specStubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.service+'.spec.stub'
    createFile(fileTypes.service+'.spec',moduleName,folderName,fileName,specStubPath)
  }

}
const createRepositoryFile =  function(moduleName,folderName,fileName,crud=false){
  let stubType='/singles'
  if (crud)stubType='/crud';
  let stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.repository+'.stub'
  createFile(fileTypes.repository,moduleName,folderName,fileName,stubPath)
}
const createControllerFile =  function(moduleName,folderName,fileName,crud=false,spec=false){
  let stubType='/singles'
  if (crud)stubType='/crud';
  let stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.controller+'.stub'
  createFile(fileTypes.controller,moduleName,folderName,fileName,stubPath)
  if (spec){
    let specStubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.controller+'.spec.stub'
    createFile(fileTypes.controller+'.spec',moduleName,folderName,fileName,specStubPath)
  }

}

const createEntityFile =  function(moduleName,folderName,fileName,crud=false){
  let stubType='/singles'
  if (crud)stubType='/crud';
  createFolder('src/models/'+folderName+'/entities')
  stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.entity+'.stub'
  createFile(fileTypes.entity,moduleName,folderName+'/entities',fileName,stubPath)
}
const createDtoFile =  function(moduleName,folderName,fileName,crud=false){
  let stubType='/singles'
  if (crud)stubType='/crud';
  createFolder('src/models/'+folderName+'/dto')

  if (!crud){
    stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.dto+'.stub'
    createFile(fileTypes.dto,moduleName,folderName+'/dto',fileName,stubPath)
  }else {
    stubPath = __dirname+'/stubs'+stubType+'/create-Dummy.'+fileTypes.dto+'.stub'
    createFile(fileTypes.dto,ConvertFileNameToModuleName(moduleName),folderName+'/dto','create-'+fileName,stubPath)
    stubPath = __dirname+'/stubs'+stubType+'/update-Dummy.'+fileTypes.dto+'.stub'
    createFile(fileTypes.dto,ConvertFileNameToModuleName(moduleName),folderName+'/dto','update-'+fileName,stubPath)
  }

}

exports.microService ={
  call
}
