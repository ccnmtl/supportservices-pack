/* global beforeEach: true, describe: true, it: true */

require('!file-loader?name=[name].[ext]!./view-test.html');
var assert = require('assert');
var jQuery = require('jquery');
var module = require('../src/supportservices');

describe('SupportServicesViewTest', function() {

    beforeEach(function() {
        var elt = jQuery('div.support-services');
        assert.ok(elt);

        new module.SupportServicesView({el: elt});
    });

    it('initialize', function() {
        assert.equal(jQuery('.services-list a.support-service').length, 10);
        assert.equal(jQuery('ul.support-service-progress li').length, 10);
    });

    it('onSelectAndCloseService', function() {
        // description is closed
        assert.strictEqual(jQuery('.service-description-list').is(':visible'), false);

        // open description
        jQuery('.services-list a.support-service').first().click();
        assert.strictEqual(jQuery('.service-description-list').is(':visible'), true);

        // close description
        jQuery('button.close').click();
        assert.strictEqual(jQuery('.service-description-list').is(':visible'), false);
    });
});
