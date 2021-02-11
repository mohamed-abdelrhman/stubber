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
    let moduleName = ConvertFileNameToModuleName((argv.module_name).toLowerCase())
    let folderName = (argv.module_name).toLowerCase()
    let fileName = (argv.module_name).toLowerCase()
    //create Main folder
    await createFolder(folderName)
    let crud=false;
    let spec=false;
    if (argv.f) crud=true;
    if (argv.spec) spec=true;
    console.log(spec)
    if (argv.A){
        createModuleFile(moduleName,folderName,fileName,crud)
        createServiceFile(moduleName,folderName,fileName,crud,spec)
        createRepositoryFile(moduleName,folderName,fileName,crud)
        createControllerFile(moduleName,folderName,fileName,crud,spec)
        createEntityFile(moduleName,folderName,fileName,crud)
        createDtoFile(moduleName,folderName,fileName,crud)
    }else if (argv.d&& typeof argv.d =='string'){
        let fileName = (argv.d).toLowerCase()
        moduleName=ConvertFileNameToModuleName(fileName)
        await createDtoFile(moduleName,folderName,fileName,crud)
    }else if (argv.s && typeof argv.s =='string'){
        let fileName = (argv.s).toLowerCase()
        moduleName=ConvertFileNameToModuleName(fileName)
        await createServiceFile(moduleName,folderName,fileName, crud)

    }else if (argv.r&& typeof argv.s =='string'){
        let fileName = (argv.r).toLowerCase()
        moduleName=ConvertFileNameToModuleName(fileName)
        await createRepositoryFile(moduleName,folderName,fileName, crud)

    }else if (argv.c && typeof argv.c =='string'){
        let fileName = (argv.c).toLowerCase()
        moduleName=ConvertFileNameToModuleName(fileName)
        await createControllerFile(moduleName,folderName,fileName, crud)
    }
    else if (argv.e && typeof argv.e =='string'){
        let fileName = (argv.e).toLowerCase()
        moduleName=ConvertFileNameToModuleName(fileName)
        await createEntityFile(moduleName,folderName,fileName)
    }


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
    createFolder(folderName+'/entities')
    stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.entity+'.stub'
    createFile(fileTypes.entity,moduleName,folderName+'/entities',fileName,stubPath)
}
const createDtoFile =  function(moduleName,folderName,fileName,crud=false){
    let stubType='/singles'
    if (crud)stubType='/crud';
    createFolder(folderName+'/dto')

    if (!crud){
        stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.dto+'.stub'
        createFile(fileTypes.dto,moduleName,folderName+'/dto',fileName,stubPath)
    }else {
        stubPath = __dirname+'/stubs'+stubType+'/Dummy.'+fileTypes.dto+'.stub'
        createFile(fileTypes.dto,ConvertFileNameToModuleName('create-'+moduleName),folderName+'/dto','create-'+fileName,stubPath)
        createFile(fileTypes.dto,ConvertFileNameToModuleName('update-'+moduleName),folderName+'/dto','update-'+fileName,stubPath)
        createFile(fileTypes.dto,ConvertFileNameToModuleName('get-'+moduleName),folderName+'/dto','get-'+fileName,stubPath)
        createFile(fileTypes.dto,ConvertFileNameToModuleName('delete-'+moduleName),folderName+'/dto','delete-'+fileName,stubPath)
    }

}

exports.microService ={
   call
}
