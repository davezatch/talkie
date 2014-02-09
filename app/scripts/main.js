/*global talkie, $*/


window.talkie = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        "use strict";

        var talkerModel = new talkie.Models.TalkerModel();

        new talkie.Views.TalkerView({
            model: talkerModel
        });
    }
};

$(document).ready(function () {
    "use strict";
    talkie.init();

});
