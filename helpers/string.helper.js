let fs = require('fs');

function DeCapitalizeFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function CapitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function ReplaceDummyData (file,moduleName,fileName) {
    fs.readFile(file, 'utf8', async function (err,data) {
        if (err) {
            return console.log(err);
        }
        let result = data.replace(/Dummy/g,moduleName).replace(/dummy/g,DeCapitalizeFirstLetter(moduleName)).replace(/fileName/g,fileName);
        fs.writeFile(file, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    })
}

function ConvertFileNameToModuleName(name){
    const words = name.split("-");
    return words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join("")
}

exports.CapitalizeFirstLetter= CapitalizeFirstLetter;
exports.DeCapitalizeFirstLetter= DeCapitalizeFirstLetter;
exports.ReplaceDummyData= ReplaceDummyData;
exports.ConvertFileNameToModuleName= ConvertFileNameToModuleName;
