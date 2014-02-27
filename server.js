// http://www.sitepoint.com/serving-static-files-with-node-js/
// https://github.com/cloudhead/node-static

var static = require('node-static');
var http = require('http');
var util = require('util');

var webroot = './',
  port = 8080;

var file = new(static.Server)(webroot, { 
  cache: 600, 
  headers: { 'X-Powered-By': 'node-static' } 
});

http.createServer(function(req, res) {
  file.serve(req, res);
}).listen(port);


console.log('node-static running at http://localhost:%d', port);
