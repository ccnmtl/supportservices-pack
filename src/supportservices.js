/* global jQuery: true, module: true, alert: true */

var jQuery = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

// load json data
var services = require('../static/json/services.json');

var SupportService = Backbone.Model.extend({
    toTemplate: function() {
        return _(this.attributes).clone();
    }
});

var SupportServiceList = Backbone.Collection.extend({
    model: SupportService,
    initialize: function(lst) {
        if (lst !== undefined && lst instanceof Array) {
            for (var i = 0; i < lst.length; i++) {
                var x = new SupportService(lst[i]);
                this.add(x);
            }
        }
    },
    getByDataId: function(internalId) {
        return this.get(internalId);
    },
    toTemplate: function() {
        var a = [];
        this.forEach(function(item) {
            a.push(item.toTemplate());
        });
        return a;
    },
    comparator: function(service) {
        return [service.get('category'), service.get('title')];
    }
});

var UserState = Backbone.Model.extend({
    defaults: {
        services: new SupportServiceList()
    }
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1));
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var SupportServicesView = Backbone.View.extend({
    events: {
        'click .support-service': 'onSelectService',
        'click div.service-description-list button.close':
        'onCloseDescription'
    },
    initialize: function(options) {
        _.bindAll(this, 'initialRender', 'render', 'maybeComplete',
                  'onSelectService', 'onCloseDescription', 'onPrint',
                  'beforeUnload');

        this.servicesTemplate =
            require('../static/templates/services-template.html');

        this.services = new SupportServiceList(services);

        this.state = new UserState();
        this.state.on('change', this.render);

        // @todo - necessary?
        this.on('render', this.render);

        this.initialRender();

        jQuery('.btn-print').click(this.onPrint);
        jQuery('.interactive-container').show();
        var quiet = getUrlParameter('quiet') === '1';
        if (!quiet) {
            jQuery(window).on('beforeunload', this.beforeUnload);
        }
    },
    initialRender: function() {
        var context = {'services': this.services.toTemplate()};

        var markup = this.servicesTemplate(context);
        jQuery(this.el).html(markup);
        this.delegateEvents();

        this.maybeComplete();
    },
    render: function() {
        var selected = this.state.get('services').length;
        var elts = jQuery('ul.support-service-progress li');
        for (var i = 0; i < selected; i++) {
            jQuery(elts[i]).addClass('selected');
        }

        this.state.get('services').forEach(function(service) {
            jQuery('[data-service-id="' + service.get('id') + '"]')
                .addClass('selected');
        });

        this.maybeComplete();
    },
    maybeComplete: function() {
        if (this.state.get('services').length === this.services.length) {
            jQuery('.activity-complete').show();
        } else {
            jQuery('.activity-complete').hide();
        }
    },
    onCloseDescription: function(evt) {
        jQuery('div.service-description-list div.description').hide();
        jQuery('div.service-description-list').hide();
    },
    onPrint: function(evt) {
        window.print();
    },
    onSelectService: function(evt) {
        var self = this;
        var serviceId = jQuery(evt.currentTarget).data('service-id');

        if (this.state.get('services')
            .getByDataId(serviceId) === undefined) {
            var service = this.services.getByDataId(serviceId);
            this.state.get('services').add(service, {merge: true});
            self.trigger('render');
        }

        self.onCloseDescription();
        jQuery('[data-service-description="' + serviceId + '"]').show();
        jQuery('div.service-description-list').show();
    },
    beforeUnload: function() {
        if (jQuery('.activity-complete:hidden').length > 0) {
            return 'The activity is not complete. ' +
                'Your progress will not be saved if you leave this page.';
        }
    }
});

module.exports.services = services;
module.exports.SupportServicesView = SupportServicesView;
module.exports.SupportServiceList = SupportServiceList;

