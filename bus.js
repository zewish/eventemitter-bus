'use strict';

let is = require('is')
    , util = require('util')
    , EventEmitter = require('events').EventEmitter;

function Bus() {
    let bus = this;

    bus.providers = {};

    bus.provide = (name, obj, replace) => {
        if (!name || !obj) {
            throw Error('missing params (name, obj)');
        }

        if (!is.object(obj)) {
            throw Error('obj should be an object');
        }

        if (replace) {
            bus.providers[name] = null;
        }

        bus.providers[name] = bus.providers[name] || obj;
        return bus;
    };

    bus.replace = (name, obj) => {
        return bus.provide(name, obj, true);
    };

    bus.run = function(name) {
        if (!name) {
            throw Error('missing param (name)');
        }

        if (name.search(/\./) === -1) {
            throw Error('no function specified');
        }

        let names = name.split('.')
            , obj = bus.providers[ names[0] ] || {}
            , func = obj[ names[1] ];

        if (!is.fn(func)) {
            throw Error(`no function (${name})`);
        }

        func.apply(obj, Array.prototype.splice.call(arguments, 1));
        return bus;
    };

    bus.fn = {
        provide: (name, fn, replace) => {
            if (!name || !fn) {
                throw Error('missing params (name, fn)');
            }

            bus.provide(name, {});
            if (!is.fn(fn) || !fn.name) {
                throw Error('fn must be a named function');
            }

            if (replace) {
                bus.providers[name][fn.name] = null;
            }

            bus.providers[name][fn.name] = bus.providers[name][fn.name] || fn.bind(bus.providers[name]);
            return bus;
        }
        , replace: function(name, fn) {
            return bus.fn.provide(name, fn, true);
        }
        , run: function(name) {
            bus.run(name);
            return bus.fn;
        }
    };
}

util.inherits(Bus, EventEmitter);

module.exports = new Bus();
module.exports.Bus = Bus;
