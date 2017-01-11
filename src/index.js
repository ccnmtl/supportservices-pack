/* global jQuery: true */

require('!file?name=[name].[ext]!../static/index.html');
require('!file?name=[name].[ext]!../static/img/logo-ctl.png');
require('!file?name=[name].[ext]!../static/img/logo-cdm.png');

// load css
require('!style!css!bootstrap/dist/css/bootstrap.min.css');
require('../static/css/common.css');
require('../static/css/supportservices.css');

var jQuery = require('jquery');
var module = require('./supportservices.js');

jQuery(document).ready(function() {
    var view = new module.SupportServicesView({
        el: 'div.support-services'
    });
});
