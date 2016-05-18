/* global jQuery: true */

// load css
require('../static/css/supportservices.css');
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');

var jQuery = require('jquery');
var module = require('./supportservices.js');

jQuery(document).ready(function() {
    var view = new module.SupportServicesView({
        el: 'div.support-services'
    });
});
