/*global talkie, $*/


window.talkie = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';

        new talkie.Views.TalkerView();
    }
};

$(document).ready(function () {
    'use strict';
    talkie.init();

});
