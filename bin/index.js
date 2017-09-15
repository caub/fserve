#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const serveStatic = require('serve-static');

const serve = serveStatic('.', {extensions: ['html']});

const errhandler = (req, res) => err => {
	res.setHeader('X-Content-Type-Options', 'nosniff');
	res.statusCode = 404;
	res.end();
}

const defaultDir = __dirname+'/../';
const arg1 = process.argv[2] || '';
const arg2 = process.argv[3] || '';

const [sec, PORT] = arg1.startsWith('-s') ? [arg1.slice(3)||defaultDir, parseInt(arg2)||3000] :
						[arg2.startsWith('-s') ? arg2.slice(3)||defaultDir : null, parseInt(arg1)||3000];

const proto = sec ? require('https') : require('http');

const createServer = cb => sec ? require('https').createServer({
	key: fs.readFileSync(path.join(sec, 'key.pem')),
	cert: fs.readFileSync(path.join(sec, 'cert.pem'))
}, cb) : require('http').createServer(cb);

const server = createServer((req, res) => {
	serve(req, res, errhandler(req, res));
});

server.listen(PORT);

process.on('exit', () => { server.close(); process.exit(); });

//catches ctrl+c event
process.on('SIGINT', () => { server.close(); process.exit(); });


process.stdin.resume(); // hang console until it's closed
console.log(`listen http${sec?'s':''}://localhost:%d`, PORT);


