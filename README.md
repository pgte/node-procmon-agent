# procmon-agent

To be used with [Procmon](https://github.com/pgte/procmon).

## Install

```bash
$ npm i procmon-agent
```

## Use

```javascript
require('procmon-agent')();
```

Or, with options:

```javascript
require('procmon-agent')(options);
```

### Options

* autoStart: (default: true) - make agent listen
* path: unix socket server path: (defaults to `/tmp/procmon-agent-{PID}.sock`)

## License

ISC