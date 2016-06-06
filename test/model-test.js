/* global beforeEach: true, describe: true, it: true */

var assert = require('chai').assert;

var module = require('../src/supportservices');

describe('SupportServicesListTest', function() {
    var list = null;

    beforeEach(function() {
        list = new module.SupportServiceList(module.services);
    });

    it('initialize', function() {
        assert.equal(list.length, 10);
    });

    it('getByDataId', function() {
        var service = list.getByDataId('1');
        assert(service !== undefined);
        assert.equal(service.get('title'), 'Tri-Center Transportation');
    });

    it('toTemplate', function() {
        var ctx = list.toTemplate();
        assert.equal(ctx.length, 10);
    });

    it('comparator', function() {
        var service = list.getByDataId('1');
        var a = list.comparator(service);
        assert.equal(a.length, 2);
        assert.equal(a[0], 'Transportation');
        assert.equal(a[1], 'Tri-Center Transportation');
    });
});

