var net = require('net');
var Stream = require('./busy_stream');
var JSONStream = require('json-duplex-stream');

module.exports = Server;

function Server(options) {
  var server = net.createServer(handleConnection);
  var oldListen = server.listen;
  var path = options.path || '/tmp/procmon-agent-' + process.pid + '.sock';
  server.listen = function listen() {
    var args = Array.prototype.slice.call(arguments);
    if (!arguments.length || arguments.length == 1 && (typeof arguments[0] == 'function'))
      args.unshift(path);

    oldListen.apply(this, args);
  }
  return server;

  function handleConnection(conn) {
    var s = Stream(options);
    var json = JSONStream().out;
    conn.pipe(s).pipe(json).pipe(conn);

    conn.on('error', function(err) {
      conn.destroy();
      server.emit('error', err);
    });
  }
}