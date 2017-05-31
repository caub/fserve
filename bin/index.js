#!/usr/bin/env node
const http = require('http');
const serveStatic = require('serve-static');

const serve = serveStatic('.', {extensions: ['html']});

const errhandler = (req, res) => err => {
	res.setHeader('X-Content-Type-Options', 'nosniff');
	res.statusCode = 404;
	res.end();
}


const server = http.createServer((req, res) => {
	serve(req, res, errhandler(req, res))
});

const PORT = parseInt(process.argv[2])||3000;

server.listen(PORT);



process.on('exit', () => { server.close(); process.exit(); });

//catches ctrl+c event
process.on('SIGINT', () => { server.close(); process.exit(); });


process.stdin.resume(); // hang console until it's closed
console.log('listen http://localhost:%d', PORT);


