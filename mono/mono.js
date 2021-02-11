const { createFile, createFolder } = require("../helpers/files.helper");
const {ConvertFileNameToModuleName} = require("../helpers/string.helper");

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
const createAllMonoFiles=  function (moduleName,folderName,fileName,crud){
    createModuleFile(moduleName,folderName,fileName,crud)
    createServiceFile(moduleName,folderName,fileName,crud)
    createRepositoryFile(moduleName,folderName,fileName,crud)
    createResolverFile(moduleName,folderName,fileName,crud)
    createEntityFile(moduleName,folderName,fileName,crud)
    createTypeFile(moduleName,folderName,fileName,crud)
    createInputFile(moduleName,folderName,fileName,crud)
}

const createModuleFile =  function(moduleName,folderName,fileName,crud=false){
    let stubType='/singles'
    if (crud)stubType='/crud';
    let stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.module+'.stub'
     createFile(fileTypes.module,moduleName,folderName,fileName,stubPath)
}
const createServiceFile =  function(moduleName,folderName,fileName,crud=false){
    let stubType='/singles'
    if (crud)stubType='/crud';
    let stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.service+'.stub'
     createFile(fileTypes.service,moduleName,folderName,fileName,stubPath)
}
const createRepositoryFile =  function(moduleName,folderName,fileName,crud=false){
    let stubType='/singles'
    if (crud)stubType='/crud';
    let stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.repository+'.stub'
     createFile(fileTypes.repository,moduleName,folderName,fileName,stubPath)
}
const createResolverFile =  function(moduleName,folderName,fileName,crud=false){
    let stubType='/singles'
    if (crud)stubType='/crud';
    let stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.resolver+'.stub'
     createFile(fileTypes.resolver,moduleName,folderName,fileName,stubPath)
}

const createEntityFile =  function(moduleName,folderName,fileName,crud=false){
    let stubType='/singles'
    if (crud)stubType='/crud';
     createFolder(folderName+'/entities')
    stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.entity+'.stub'
     createFile(fileTypes.entity,moduleName,folderName+'/entities',fileName,stubPath)
}
const createTypeFile =  function(moduleName,folderName,fileName,crud=false){
    let stubType='/singles'
    if (crud)stubType='/crud';
     createFolder(folderName+'/types')
    stubPath = __dirname+'/stubs/'+stubType+'/Dummy.'+fileTypes.type+'.stub'
     createFile(fileTypes.type,moduleName,folderName+'/types',fileName,stubPath)
}
const createInputFile =  function(moduleName,folderName,fileName,crud=false){
    let stubType='/singles'
    if (crud)stubType='/crud';
    if (!crud){
        createFolder(folderName+'/inputs')
        stubPath = __dirname+'/stubs/'+stubType+'/Dummy.'+fileTypes.input+'.stub'
        createFile(fileTypes.input,moduleName,folderName+'/inputs',fileName,stubPath)
    }else {
        createFolder(folderName+'/inputs')
        stubPath = __dirname+'/stubs/'+stubType+'/Dummy.'+fileTypes.input+'.stub'
        createFile(fileTypes.input,ConvertFileNameToModuleName('create-'+moduleName),folderName+'/inputs','create-'+fileName,stubPath)
        createFile(fileTypes.input,ConvertFileNameToModuleName('update-'+moduleName),folderName+'/inputs','update-'+fileName,stubPath)
        createFile(fileTypes.input,ConvertFileNameToModuleName('get-'+moduleName),folderName+'/inputs','get-'+fileName,stubPath)
        createFile(fileTypes.input,ConvertFileNameToModuleName('delete-'+moduleName),folderName+'/inputs','delete-'+fileName,stubPath)
    }

}

exports.mono ={
    createAllMonoFiles,
    createModuleFile,
    createEntityFile,
    createInputFile,
    createRepositoryFile,
    createResolverFile,
    createServiceFile,
    createTypeFile
}
