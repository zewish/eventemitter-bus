#!/usr/bin/env node

'use strict';
let bus = require('../bus.js');

bus.provide('calculator', {
    add: (a, b) => {
        bus.emit('calculator.add', {
            a: a
            , b: b
            , result: a + b
        });
    }
});

bus.on('calculator.add', (result) => {
    console.log('calculator.add =>', result);
});

bus
.run('calculator.add', 1, 6)
.run('calculator.add', 1, 29);
