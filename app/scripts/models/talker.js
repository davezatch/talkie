/*global talkie, Backbone*/

talkie.Models = talkie.Models || {};

(function () {
    'use strict';

    talkie.Models.TalkerModel = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
