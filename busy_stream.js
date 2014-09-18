var toobusy = require('toobusy');
var inherits = require('util').inherits;
var Duplex = require('stream').Duplex;

toobusy.maxLag(10e3); // relax max lag, we just want to monitor

module.exports = BusyStream;

function BusyStream(options) {
  if (! (this instanceof BusyStream)) return new BusyStream(options);
  if (! options) options = {};
  options.objectMode = true;
  if (! options.period) options.period = 3e3;

  Duplex.call(this, options);

  var self = this;

  var interval = setInterval(poll, options.period);
  interval.unref();

  this.end = function(b) {
    if (b) this.push(b);
    clearInterval(interval);
  };

  function poll() {
    self.push({time: Date.now(), lag: toobusy.lag()});
  }
}

inherits(BusyStream, Duplex);
BusyStream.prototype._read = noop;
BusyStream.prototype._write = noop;
function noop() {}