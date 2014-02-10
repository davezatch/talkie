/*global talkie, Backbone, JST, speechSynthesis, SpeechSynthesisUtterance*/

talkie.Views = talkie.Views || {};

(function () {
    "use strict";

    talkie.Views.TalkerView = Backbone.View.extend({

        el: $("#main"),

        template: JST["app/scripts/templates/talker.ejs"],

        events: {
            "click .voice-li": "setActiveVoice",
            "click .play": "handleText",
            "click .cancel": "cancelSpeech",
            "change input[type='range']": "updateRangeSlider"
        },

        initialize: function() {
            var self = this,
                featureCheckCount = 0;

            // since it takes a while (not sure why?) to get the supported voices list, we attempt for a couple seconds to grab it.  If successful, we render the page, otherwise if we hit the time limit, we show our sad 'unsupported' message
            var getVoices = setInterval(function() {
                if (self.model.get("voices").length === 0) {
                    featureCheckCount++;
                    self.model.set("voices", window.speechSynthesis.getVoices());
                } else {
                    clearInterval(getVoices);
                    self.render();
                }

                if (++featureCheckCount === 20) {
                    self.model.set("supported", false);
                    clearInterval(getVoices);
                    self.render();
                }
            }, 100);

        },

        render: function() {
            var self = this;

            this.$el.html(this.template(this.model.toJSON()));

            if (!this.model.get("supported")) {
                this.$(".btn").attr("disabled", true);
                this.$(".unsupported").removeClass("hidden");
            }

            this.setHighlightedVoice(this.model.get("chosenVoice"));

            setInterval(function() {
                if (!speechSynthesis.speaking && self.supported) {
                    self.endAnimation();
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

            this.beginAnimation();

            msg.voice = speechSynthesis.getVoices().filter(function(voice) {
                return voice.name === self.model.get("chosenVoice");
            })[0];

            msg.voiceURI = "native";
            msg.volume = this.model.get("volume"); // 0 to 1
            msg.rate = this.model.get("rate"); // 0.1 to 10
            msg.pitch = this.model.get("pitch"); //0 to 2
            msg.text = this.$("textarea").val();
            msg.lang = "en-US";

            this.$(".play").attr("disabled", true);
            this.$(".cancel").removeAttr("disabled");

            msg.onend = function() {
                self.endAnimation();
            };

            msg.onerror = function(event) {
                console.log("speechSynthesis error :(");
                console.log(event);
            };

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

            this.model.set("chosenVoice", selectedVoice);

            this.setHighlightedVoice(this.model.get("chosenVoice"));

        },

        beginAnimation: function() {
            this.$(".throbber").removeClass("hidden");

            this.$(".play").attr("disabled", true);
            this.$(".cancel").removeAttr("disabled");
        },

        endAnimation: function() {
            this.$(".throbber").addClass("hidden");

            this.$(".play").removeAttr("disabled");
            this.$(".cancel").attr("disabled", true);
        },

        updateRangeSlider: function(event) {
            var $rangeInput = $(event.target),
                valueType = $rangeInput[0].id;

            this.model.set(valueType, parseFloat($rangeInput.val(), 10));

            this.$("." + valueType + "-value").text(this.model.get(valueType));
        }

    });

})();
