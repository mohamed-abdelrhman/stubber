let fs = require('fs');
const {ReplaceDummyData} = require("./string.helper");
const createFolder = async function(folderName) {
    let dir = './'+folderName;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
};



const copyFile = async function (from, to){
    await fs.copyFile(from, to, (err) => {
        if (err) throw err;
    });
}

const createFile=async function (type,moduleName,folderName,fileName,stubPath) {
    let filePath ='src/models/'+folderName+'/'+fileName+'.'+type+'.ts';
    if (fs.existsSync(filePath)){
        console.log(fileName+'.'+type+'.ts already there !')
    }else {
        copyFile(stubPath,filePath).then(  ()=> {
             ReplaceDummyData(filePath,moduleName,fileName)
            console.log(fileName+'.'+type+'.ts created !')
        })
    }
}
exports.createFolder= createFolder;
exports.copyFile= copyFile;
exports.createFile= createFile;
