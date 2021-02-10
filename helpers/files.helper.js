let fs = require('fs');
const createFolder = function(folderName) {
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

exports.createFolder= createFolder;
exports.copyFile= copyFile;
