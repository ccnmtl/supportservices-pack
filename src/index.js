/* global jQuery: true */

require('!file-loader?name=[name].[ext]!../static/index.html');
require('!file-loader?name=[name].[ext]!../static/img/logo-ctl.png');
require('!file-loader?name=[name].[ext]!../static/img/logo-cdm.png');

// load css
require('!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css');
require('!style-loader!css-loader!../static/css/common.css');
require('!style-loader!css-loader!../static/css/supportservices.css');

var jQuery = require('jquery');
var module = require('./supportservices.js');

jQuery(document).ready(function() {
    new module.SupportServicesView({
        el: 'div.support-services'
    });
});
