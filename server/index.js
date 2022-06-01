var debug = require('debug')('server:server');
var http = require('http');
const app = require('./app');

//setup

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);

function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
}

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

server.listen(port,()=>
console.log(`server listening on port: ${port}`));
server.on('error', onError);
server.on('listening', onListening);



/* const server1 = app.listen(PORT, ()=> console.log(`backend running on port ${PORT}`))
process.on('unhandled rejection', err =>{
  console.log(`server error: ${err.message}`);
  server.close(()=> process.exit(1));
}) */