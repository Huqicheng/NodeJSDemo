var http = require('http');
var read = require("./readfile");
var url = require("url")


http.createServer(function (request, response) {

    // HTTP Head
    // HTTP StatusCode: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // send response for '/output'
    var pathname = url.parse(request.url).pathname;
    console.log(pathname);
    // read content of output.txt and respond to the client asynchronously
    if(pathname == '/output'){
        read.read_output( function (err, data) {
            if (err){
                console.log(err.stack);
                return;
            }
            //console.log(data.toString());
            response.write(data.toString());
            response.end();
        });
    }else{
        response.write('404 not found');
        response.end();
    }

}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');