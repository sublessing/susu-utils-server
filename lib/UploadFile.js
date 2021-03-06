/**
 * upload file to server
 * you need to specify the file storage location
 * Exclusive server use
 */
const formidable = require("formidable")
const fs = require('fs');

class UploadFile {
    constructor (folderPath) {
        this.folderPath = folderPath;
    }

    //  If the input parameter is less than 10, it will be converted to two digits.
    static zero (num) {
        return num < 10 ? '0'+num : num;
    }

    //  Use this function to pass in the Request Object
    //  Successful return to upload success path
    upload (req) {
        let resolve, reject;
        let promise = new Promise((x, y) => {resolve = x; reject = y;});
        let form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = this.folderPath;
        form.keepExtensions = true;
        form.maxFieldsSize = 2 * 1024 * 1024;
        form.parse(req, (err, fields, files) => {
            if (err) return reject({code: 502, msg: 'upload error'});
            let filename = files.the_file ? files.the_file.name : files.file.name
            let nameArray = filename.split('.');
            let type = nameArray[nameArray.length - 1];
            let date = new Date();
            let time = date.getFullYear() + "_" + UploadFile.zero(date.getMonth()+1) + "_" + UploadFile.zero(date.getDate()) + 
                       "_" + UploadFile.zero(date.getHours()) + "_" + UploadFile.zero(date.getMinutes()) + "_" + UploadFile.zero(date.getSeconds());
            let avatarName = time + '.' + type;
            let newPath = form.uploadDir + avatarName;
            fs.renameSync((files.the_file ? files.the_file.path : files.file.path), newPath); 
            resolve({code: 0, fullPath: newPath, name: avatarName});
        })
        return promise;
    }

}

module.exports = UploadFile