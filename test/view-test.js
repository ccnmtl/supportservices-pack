/* global beforeEach: true, describe: true, it: true */

var assert = require('chai').assert;
var jQuery = require('jquery');
var module = require('../src/supportservices');

describe('SupportServicesViewTest', function() {
    var view;

    beforeEach(function() {
        var elt = jQuery('div.support-services');
        assert.isDefined(elt);

        view = new module.SupportServicesView({el: elt});
    });

    it('initialize', function() {
        assert.equal(jQuery('.services-list a.support-service').length, 10);
        assert.equal(jQuery('ul.support-service-progress li').length, 10);
    });

    it('onSelectAndCloseService', function() {
        // description is closed
        assert.isFalse(jQuery('.service-description-list').is(':visible'));

        // open description
        jQuery('.services-list a.support-service').first().click();
        assert.isTrue(jQuery('.service-description-list').is(':visible'));

        // close description
        jQuery('button.close').click();
        assert.isFalse(jQuery('.service-description-list').is(':visible'));
    });
});
