const http = require('http');
const server = http.createServer().listen(8080);
server.on('listening', (...p) => {
  console.log(p);
});