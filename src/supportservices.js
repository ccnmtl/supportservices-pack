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

var SupportServicesView = Backbone.View.extend({
    events: {
        'click .support-service': 'onSelectService',
        'click div.service-description-list button.close':
        'onCloseDescription'
    },
    initialize: function(options) {
        _.bindAll(this, 'initialRender', 'render', 'maybeComplete',
                  'onSelectService', 'onCloseDescription', 'onPrint');

        this.servicesTemplate =
            require('../static/templates/services-template.tpl');

        this.services = new SupportServiceList(services);

        this.state = new UserState();
        this.state.on('change', this.render);

        // @todo - necessary?
        this.on('render', this.render);

        this.initialRender();

        jQuery('.btn-print').click(this.onPrint);
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
    }
});

module.exports.services = services;
module.exports.SupportServicesView = SupportServicesView;
module.exports.SupportServiceList = SupportServiceList;

