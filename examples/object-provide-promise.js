#!/usr/bin/env node

'use strict';
let bus = require('../bus.js');

let calculator = {
    add: (a, b) => {
        var promise = new Promise((resolve, reject) => {
            if (!a || !b) {
                return reject('both the "a" and "b" params required');
            }

            resolve({
                a: a
                , b: b
                , result: a + b
            });
        });

        bus.emit('calculator.add', promise);
    }
}

bus.provide('calculator', calculator);

bus.on('calculator.add', (promise) => {
    promise
    .then((res) => {
        console.error('[SUCCESS] calculator.add =>', res);
    })
    .catch((err) => {
        console.error('[ERROR] calculator.add =>', err);
    });
});

bus
.run('calculator.add') // This should generate an error
.run('calculator.add', 1, 29);
