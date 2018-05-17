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

jQuery(document).ready(function() {

    if (!getUrlParameter('parent')) {
        jQuery('#cu-privacy-notice').addClass('required');
    }

    new module.SupportServicesView({
        el: 'div.support-services'
    });
});
