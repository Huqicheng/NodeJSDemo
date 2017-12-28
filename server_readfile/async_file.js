var http = require('http');
var read = require("./readfile");
var url = require("url");
var async = require("async");

http.createServer(function (request, response) {

    // HTTP Head
    // HTTP StatusCode: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/html'});

    // send response for '/output'
    var parseRes = url.parse(request.url,true);
    var pathname = parseRes.pathname;
    // read content of output.txt and respond to the client asynchronously

    if(pathname == '/output'){
        read.read_output('index.html', function (err, data) {
            if (err){
                console.log(err.stack);
                return;
            }
            //console.log(data.toString());
            response.write(data.toString());
            response.end();
        });
    }else if(pathname == '/readfile'){
        var args = parseRes.query;
        read.read_output(args.file+'.txt', function (err, data) {
            if (err){
                console.log(err.stack);
                response.write('file not found');
                response.end();
                return;
            }
            //console.log(data.toString());
            response.write(data.toString());
            response.end();
        });
    }else if(pathname == '/asyncdemo'){
        async.series({
            one: function(callback){
                callback(null, 1);
            },
            two: function(callback){
                callback(null, 2);
            }
        },function(err, results) {
            response.write(results.one.toString());
            response.write(results.two.toString()+'\n');

        });
        async.parallel([
                function(callback){
                    callback(null, 'one');
                },
                function(callback){
                    callback(null, 'two');
                }
            ],
            function(err, results){
                for(var i=0;i<results.length;i++){
                    response.write(results[i]);
                }

            });
        response.end();
    }
    else{
        response.write('404 not found');
        response.end();
    }

}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');