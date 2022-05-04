var http = require('http');

function handle_GET(request, response) {
    response.writeHead(200);
    response.write("Hello World");
    response.end();
}

function handle_POST(request, response) {
    response.writeHead(200);
    response.write("Hello World");
    response.end();
}

function onrequest(request, response) {

    let method = request.method;

    if (method == 'GET') {
        handle_GET(request, response);
    }
    else if (method == 'POST') {
        handle_POST(request, response);
    }
    else {
        handle_rest(request, response);
    }

}

var server = http.createServer(onrequest);
server.listen(8000);

console.log("Listening on http://127.0.0.1:8000/");