/* global jQuery: true */

var jQuery = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

// load json data
var services = require('../static/json/services.json');

// load css
require('../static/css/supportservices.css');
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');

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
        return [service.get('category').name, service.get('title')];
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
        _.bindAll(this, 'initialRender', 'render',
                'onSelectService', 'onCloseDescription');

        this.servicesTemplate =
            _.template(jQuery('#services-template').html());

        this.services = new SupportServiceList(services);

        this.state = new UserState();
        this.state.on('change', this.render);

        // @todo - necessary?
        this.on('render', this.render);

        this.initialRender();
    },
    initialRender: function() {
        var context = {'services': this.services.toTemplate()};

        var markup = this.servicesTemplate(context);
        jQuery(this.el).html(markup);
        this.delegateEvents();
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

        var unlock = this.state.get('services')
            .length === this.services.length;

        if (unlock) {
            jQuery('#next').removeClass('disabled');
        } else {
            jQuery('#next').addClass('disabled');
        }
    },
    onCloseDescription: function(evt) {
        jQuery('div.service-description-list div.description').hide();
        jQuery('div.service-description-list').hide();
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

jQuery(document).ready(function() {
    var view = new SupportServicesView({
        el: 'div.support-services'
    });
});
