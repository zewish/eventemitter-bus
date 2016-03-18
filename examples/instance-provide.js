#!/usr/bin/env node

'use strict';
let bus = require('../bus.js');

let Calculator = function() {}

Calculator.prototype.add = (a, b) => {
    bus.emit('calculator.add', {
        a: a
        , b: b
        , result: a + b
    });
}

bus.provide('calculator', new Calculator());

bus.on('calculator.add', (result) => {
    console.log('calculator.add =>', result);
});

bus
.run('calculator.add', 1, 6)
.run('calculator.add', 1, 29);
