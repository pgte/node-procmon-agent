var extend = require('xtend');
var Server = require('./server');

module.exports = createAgent;

var defaultOptions = {
  autoStart: true
};

function createAgent(options) {
  options = extend({}, defaultOptions, options || {});
  var server = Server(options);
  if (options.autoStart)
    server.listen();

  return server;
}