var fs = require("fs");

exports.read_output = function(cb){
    fs.readFile('output.txt',cb)
}