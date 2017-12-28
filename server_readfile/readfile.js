var fs = require("fs");

exports.read_output = function(filename,cb){
    fs.readFile(filename,cb)
}