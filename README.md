eventemitter-bus
----------------
A simple node.js Enterprise Software Bus (ESB) implementation using EventEmitter.

[![NPM version](https://img.shields.io/npm/v/eventemitter-bus.svg?style=flat-square)](https://www.npmjs.com/package/eventemitter-bus)
[![Build Status](https://travis-ci.org/zewish/eventemitter-bus.svg?branch=master)](https://travis-ci.org/zewish/eventemitter-bus)
[![Coverage Status](https://coveralls.io/repos/zewish/eventemitter-bus/badge.svg?branch=master&service=github)](https://coveralls.io/github/zewish/eventemitter-bus?branch=master)
[![Downloads](https://img.shields.io/npm/dm/eventemitter-bus.svg?style=flat-square)](https://www.npmjs.com/package/eventemitter-bus)

Installation
------------
```
$ npm install eventemitter-bus --save
```

Development
-----------
```
$ npm install
$ npm test
```

API
---
```
// Default instance
let bus = require('eventemitter-bus');

// Or an instance managed by you
let bus = new require('eventemitter-bus').Bus();
```

### bus.provide(name, obj, replace);
```
bus.provide('calculator', {
    sub: function(a, b) {
        bus.emit('calculator.sub', {
            a: a
            , b: b
            , result: a - b
        });
    }
})
```

### bus.replace(name, obj)
```
bus.replace('calculator', {
    add: function(a, b) {
        bus.emit('calculator.add', {
            a: a
            , b: b
            , result: a + b
        })
    }
});
```

### bus.on(event, fn)
```
bus.on('calculator.sub', (res) => {
    console.log('calculator.sub =>', res);
});
```

### bus.run(name)
```
bus.run('calculator.sub', 10, 5);
```

### bus.fn.run(name)
```
// alias to bus.run()
bus.fn.run('calculator.sub', 10, 5);
```

### bus.fn.provide(name, fn, replace)
```
bus.fn.provide('calculator', function add(a, b) {
    bus.emit('calculator.add', {
        a: a
        , b: b
        , result: a + b
    });
});
```

### bus.fn.replace(name, fn)
```
bus.fn.replace('calculator', function sub(a, b) {
    bus.emit('calculator.sub', {
        a: a
        , b: b
        , result: a - b
    });
});
```