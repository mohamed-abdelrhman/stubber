const { createFile, createFolder } = require("../helpers/files.helper");
const {ConvertFileNameToModuleName} = require("../helpers/string.helper");
const fileTypes={
    'module':'module',
    'service':'service',
    'resolver':'resolver',
    'type':'type',
    'entity':'entity',
    'interface':'interface',
    'input':'input',
}


const call = async function (argv) {
    let moduleName = ConvertFileNameToModuleName((argv.moduleName).toLowerCase())
    let folderName = (argv.moduleName).toLowerCase()
    let fileName = (argv.moduleName).toLowerCase()
    //create Main folder
    await createFolder('src')
    await createFolder('src/models')
    await createFolder('src/models/'+folderName)
    let crud=argv.crud;
    let spec=false;
    if (argv.spec) spec=true;

    await createModuleFile(moduleName,folderName,fileName,crud)
    await createEntityInterface(moduleName,folderName,fileName,crud)
    await createServiceFile(moduleName,folderName,fileName,crud,spec)
    await createResolverFile(moduleName,folderName,fileName,crud,spec)
    await createTypeFile(moduleName,folderName,fileName,crud)
    await createInputFile(moduleName,folderName,fileName,crud)
}



const createModuleFile =  function(moduleName,folderName,fileName,crud=false){
    let stubType='/singles'
    if (crud)stubType='/crud';
    let stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.module+'.stub'
     createFile(fileTypes.module,moduleName,folderName,fileName,stubPath)
}


const createEntityInterface =  function(moduleName,folderName,fileName,crud=false){
    let stubType='/singles'
    if (crud)stubType='/crud';
    let stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.interface+'.stub'
    createFile(fileTypes.interface,moduleName,folderName,fileName,stubPath)
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
const createResolverFile =  function(moduleName,folderName,fileName,crud=false,spec=false){
    let stubType='/singles'
    if (crud)stubType='/crud';
    let stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.resolver+'.stub'
     createFile(fileTypes.resolver,moduleName,folderName,fileName,stubPath)


}

const createTypeFile =  function(moduleName,folderName,fileName,crud=false){
    let stubType='/singles'
    if (crud)stubType='/crud';
     createFolder('src/models/'+folderName+'/types')
    stubPath = __dirname+'/stubs/'+stubType+'/Dummy.'+fileTypes.type+'.stub'
     createFile(fileTypes.type,moduleName,folderName+'/types',fileName,stubPath)
}
const createInputFile =  function(moduleName,folderName,fileName,crud=false){
    let stubType='/singles'
    if (crud)stubType='/crud';
    if (!crud){
        createFolder('src/models/'+folderName+'/inputs')
        stubPath = __dirname+'/stubs/'+stubType+'/Dummy.'+fileTypes.input+'.stub'
        createFile(fileTypes.input,moduleName,folderName+'/inputs',fileName,stubPath)
    }else {
        createFolder('src/models/'+folderName+'/inputs')
        stubPath = __dirname+'/stubs/'+stubType+'/create-Dummy.'+fileTypes.input+'.stub'
        createFile(fileTypes.input,ConvertFileNameToModuleName(moduleName),folderName+'/inputs','create-'+fileName,stubPath)
      stubPath = __dirname+'/stubs/'+stubType+'/update-Dummy.'+fileTypes.input+'.stub'
      createFile(fileTypes.input,ConvertFileNameToModuleName(moduleName),folderName+'/inputs','update-'+fileName,stubPath)
      stubPath = __dirname+'/stubs/'+stubType+'/get-Dummy.'+fileTypes.input+'.stub'
      createFile(fileTypes.input,ConvertFileNameToModuleName(moduleName),folderName+'/inputs','get-'+fileName,stubPath)
      stubPath = __dirname+'/stubs/'+stubType+'/delete-Dummy.'+fileTypes.input+'.stub'
      createFile(fileTypes.input,ConvertFileNameToModuleName(moduleName),folderName+'/inputs','delete-'+fileName,stubPath)
    }

}

exports.microGraph ={
    call
}
