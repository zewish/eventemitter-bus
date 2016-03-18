'use strict';

require('./test.js');

let bus = require('../bus.js');

describe('bus.js', () => {
    beforeEach(() => {
        bus.providers = {};
    });

    describe('provide()', () => {
        it('should throw an error if no name provided', () => {
            expect(() => {
                bus.provide();
            }).to.throw(Error, 'missing params (name, obj)');
        });


        it('should throw an error if obj is not an object', () => {
            expect(() => {
                bus.provide('yada', 'bada');
            }).to.throw(Error, 'obj should be an object');
        });

        it('should add obj to providers', () => {
            let name = 'name1';
            let obj = { a: () => {} };

            bus.provide(name, obj);
            expect(bus.providers[name]).to.be.eql(obj);
        });

        it('should not replace the obj when called with (name, obj)', () => {
            let name = 'name3';
            let obj = { c: () => {} };

            bus.providers[name] = obj;
            bus.provide(name, { d: () => {} });

            expect(bus.providers[name]).to.be.eql(obj);
        });

        it('should replace the obj when called with (name, obj, true)', () => {
            let name = 'name4';
            let obj1 = { e: () => {} };

            bus.provide(name, obj1, true);

            let obj2 = { f: () => {} };
            bus.provide(name, obj2, true);

            expect(bus.providers[name]).to.be.eql(obj2);
        });

        it('should return self', () => {
            let name = 'name5';
            let obj = { g: () => {} };

            let res = bus.provide(name, obj);
            expect(res).to.be.eql(bus);
        });
    });

    describe('replace()', () => {
        it('should call provide(name, obj, true)', () => {
            let spy = sinon.spy(bus, 'provide');

            let name = 'name';
            let obj = { a: () => {} };

            bus.replace(name, obj);
            expect(spy.calledWith(name, obj, true)).to.be.true;
            bus.provide.restore();
        });
    });

    describe('run()', () => {
        it('should throw an error if no name param', () => {
            expect(() => {
                bus.run();
            }).to.throw(Error, 'missing param (name)');
        });

        it('should throw an error if no such function specified', () => {
            expect(() => {
                bus.run('yada');
            }).to.throw(Error, 'no function specified');
        });

        it('should throw an error if no such function found', () => {
            expect(() => {
                bus.run('yada.bada');
            }).to.throw(Error, 'no function (yada.bada)');
        });

        it('should run the function', () => {
            let name = 'name';

            let fn = function fn() {}
            let spy = sinon.spy(fn);

            bus.provide(name, {
                fn: spy
            });
            bus.run(name + '.' + fn.name, 'a', 'b');
            expect(spy.calledWith('a', 'b')).to.be.true;
        });

        it('should return self', () => {
            let name = 'name';

            bus.provide(name, {
                fn: () => {}
            });
            let res = bus.run(name + '.fn');
            expect(res).to.be.eql(bus);
        });
    });

    describe('fn', () => {
        describe('provide()', () => {
            it('should throw an error if name and fn missing', () => {
                expect(() => {
                    bus.fn.provide();
                }).to.throw(Error, 'missing params (name, fn)');
            });

            it('should create a provider', () => {
                let name = 'name1';
                let fn = function a() {};

                bus.fn.provide(name, fn);
                expect(bus.providers).to.be.an('object');
            });

            it('should throw an error if function is unnamed', () => {
                let name = 'name2';
                let fn = () => {};
                let msg = 'fn must be a named function';

                expect(() => {
                    bus.fn.provide(name, 'not a function');
                }).to.throw(Error, msg);

                expect(() => {
                    bus.fn.provide(name, fn);
                }).to.throw(Error, msg);
            });

            it('should add fn inside the provider object', () => {
                let name = 'name3';
                let fn = function a() {};

                bus.fn.provide(name, fn);
                expect(bus.providers[name][fn.name]).to.be.a('function');
            });

            it('should return self', () => {
                let name = 'name4';
                let fn = function b() {};

                let res = bus.fn.provide(name, fn);
                expect(res).to.be.eql(bus);
            });
        });

        describe('replace()', () => {
            it('should call provide(name, fn, true)', () => {
                let spy = sinon.spy(bus.fn, 'provide');

                let name = 'name';
                let fn = function f() {};

                bus.fn.replace(name, fn);
                expect(spy.calledWith(name, fn, true)).to.be.true;
                bus.fn.provide.restore();
            });
        });

        describe('run()', () => {
            it('should call bus.run()', () => {
                let name = 'name';
                let spy = sinon.stub(bus, 'run');

                bus.fn.run('name.bada');
                expect(spy.calledOnce).to.be.true;
                bus.run.restore();
            });

            it('should return self', () => {
                let name = 'name';
                let fn = function fn() {};

                bus.fn.provide(name, fn);
                let res = bus.fn.run(name + '.' + fn.name);
                expect(res).to.be.eql(bus.fn);
            });
        });
    });

    describe('new bus.Bus()', () => {
        it('should return a new instance', () => {
            let instance1 = new bus.Bus();
            let instance2 = new bus.Bus();

            expect(instance1).to.not.eql(instance2);
            expect(instance1).to.not.eql(bus);
            expect(instance2).to.not.eql(bus);
        });
    });
});
