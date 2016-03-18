#!/usr/bin/env node

'use strict';
let Bus = require('../bus.js').Bus
    , bus = new Bus();

bus
.provide('calculator', {
    sub: (a, b) => {
        bus.emit('calculator.sub', {
            a: a
            , b: b
            , result: a - b
        });
    }
});

bus
.on('calculator.sub', (result) => {
    console.log('calculator.sub =>', result);
});

bus
.run('calculator.sub', 1, 4);
