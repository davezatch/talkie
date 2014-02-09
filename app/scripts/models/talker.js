/*global talkie, Backbone*/

talkie.Models = talkie.Models || {};

(function () {
    'use strict';

    talkie.Models.TalkerModel = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
            pitch: 2,
            rate: 1,
            volume: 1,
            voices: [],
            chosenVoice: "Fred",
            supported: true
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
