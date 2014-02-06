/*global talkie, Backbone, JST*/

talkie.Views = talkie.Views || {};

(function () {
    'use strict';

    talkie.Views.TalkerView = Backbone.View.extend({

        el: $("#main"),

        template: JST['app/scripts/templates/talker.ejs'],

        events: {
            "click .voice-li": "setActiveVoice",
            "click .play": "handleText",
            "click .cancel": "cancelSpeech"
        },

        initialize: function() {
            var self = this,
                featureCheckCount = 0;

            this.voices = [];

            this.chosenVoice = "Google US English";

            this.supported = true;

            var getVoices = setInterval(function() {
                if (self.voices.length === 0) {
                    featureCheckCount++;
                    console.log(featureCheckCount);
                    self.voices = window.speechSynthesis.getVoices();
                } else {
                    clearInterval(getVoices);
                    self.render();
                }

                if (++featureCheckCount === 20) {
                    self.supported = false;
                    clearInterval(getVoices);
                    self.render();
                }
            }, 100);

        },

        render: function() {
            var self = this;

            this.$el.html(this.template({
                voices: this.voices
            }));

            if (!this.supported) {
                this.$(".btn").attr("disabled", true);
                this.$(".unsupported").removeClass("hidden");
            }

            this.setHighlightedVoice(this.chosenVoice);

            setInterval(function() {
                if (!speechSynthesis.speaking && self.supported) {
                    self.$(".play").removeAttr("disabled");
                    self.$(".cancel").attr("disabled", true);
                }
            }, 500);
        },

        handleText: function() {
            var msg = new SpeechSynthesisUtterance(),
                self = this,
                textBox = this.$("textarea");

            if (textBox.val() === "") {
                return;
            }

            msg.voice = speechSynthesis.getVoices().filter(function(voice) {
                return voice.name == self.chosenVoice;
            })[0];

            msg.voiceURI = 'native';
            msg.volume = 1; // 0 to 1
            msg.rate = 1; // 0.1 to 10
            msg.pitch = 2; //0 to 2
            msg.text = this.$("textarea").val();
            msg.lang = 'en-US';

            this.$(".play").attr("disabled", true);
            this.$(".cancel").removeAttr("disabled");

            msg.onend = function(event) {
                self.$(".play").removeAttr("disabled");
                self.$(".cancel").attr("disabled", true);
            };

            msg.onerror = function(event) {
                console.log("speechSynthesis error :(");
                console.log(event);
            }

            speechSynthesis.speak(msg);
        },

        cancelSpeech: function() {
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
        },

        setHighlightedVoice: function(voice) {
            this.$(".voice-li").removeClass("active");

            this.$("li[data-voice='" + voice + "']").addClass("active");
        },

        setActiveVoice: function(event) {
            event.preventDefault();

            var selectedVoice = this.$(event.target).data("voice");

            this.chosenVoice = selectedVoice

            this.setHighlightedVoice(this.chosenVoice);

        }

    });

})();
