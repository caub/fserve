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


server.listen(parseInt(process.argv[2])||3000);

