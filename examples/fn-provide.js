#!/usr/bin/env node

'use strict';
let bus = require('../bus.js');

bus
.provide('calculator', {
    sub: (a, b) => {
        bus.emit('calculator.sub', {
            a: a
            , b: b
            , result: a - b
        });
    }
})
.fn
    .provide('calculator', function add(a, b) {
        bus.emit('calculator.add', {
            a: a
            , b: b
            , result: a + b
        });
    });

bus
.on('calculator.sub', (result) => {
    console.log('calculator.sub =>', result);
})
.on('calculator.add', (result) => {
    console.log('calculator.add =>', result);
});

bus
.run('calculator.sub', 7, 6)
.run('calculator.add', 1, 29);
