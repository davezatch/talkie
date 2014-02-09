window.talkie={Models:{},Collections:{},Views:{},Routers:{},init:function(){"use strict";var a=new talkie.Models.TalkerModel;new talkie.Views.TalkerView({model:a})}},$(document).ready(function(){"use strict";talkie.init()}),this.JST=this.JST||{},this.JST["app/scripts/templates/talker.ejs"]=function(obj){obj||(obj={});{var __t,__p="";_.escape,Array.prototype.join}with(obj){__p+='<section id="talker">\n\n    <p class="text-danger unsupported hidden">\n        Ack! looks like this browser isn\'t supported :( Unfortunately, you will currently have to try with either Safari or Chrome until Mozilla adds further speechSynthesis support to Firefox.\n    </p>\n\n    <p>\n        Text to Speech! HTML5 is just the best. Enter some text in the box and hit <span class="text-success"><strong>play</strong></span> to listen to it.\n    </p>\n\n    <textarea class="form-control" rows="3" name="talkerText">Try me! Just press "Play"</textarea>\n\n    <div class="button-wrapper">\n        <button class="btn btn-large btn-success play">\n            <span class="glyphicon glyphicon-play"></span> Play!\n        </button>\n        <button class="btn btn-large btn-danger cancel" disabled>\n            <span class="glyphicon glyphicon-stop"></span> Stop the madness!\n        </button>\n        <div class="throbber hidden">\n            Loading...\n        </div>\n    </div>\n\n        <p class="text-info">\n            You can change some voice options (some only apply to certain voices)\n        </p>\n        <ul class="range-list">\n            <li>\n                <label for="pitch">Pitch: <span class="range-value pitch-value">'+(null==(__t=pitch)?"":__t)+'</span></label>\n                <input type="range" name="pitch" id="pitch" min="0" max="2" step="0.1" value="'+(null==(__t=pitch)?"":__t)+'">\n            </li>\n            \n            <li>\n                <label for="rate">Rate: <span class="range-value rate-value">'+(null==(__t=rate)?"":__t)+'</span></label>\n                <input type="range" name="rate" id="rate" min="0.1" max="10" step="0.1" value="'+(null==(__t=rate)?"":__t)+'">\n            </li>\n            <li>\n                <label for="volume">Volume: <span class="range-value volume-value">'+(null==(__t=volume)?"":__t)+'</span></label>\n                <input type="range" name="volume" id="volume" min="0" max="1" step="0.1" value="'+(null==(__t=volume)?"":__t)+'">\n            </li>\n        </ul>\n\n\n\n\n        <br>\n        <p class="text-info">\n            These are the voices supported by your browser and OS. Click on any of them to try:\n        </p>\n\n        <ul id="voice-list">\n            ';for(var i=0;i<voices.length;i++)__p+='\n                <li class="voice-li" data-voice="'+(null==(__t=voices[i].name)?"":__t)+'">'+(null==(__t=voices[i].name)?"":__t)+"</li>\n            ";__p+='\n        </ul>\n\n    <p class="bg-warning">\n        Note: sometimes it seems to stop working, and only resumes working if you restart the browser. Not sure why yet.\n    </p>\n\n</section>\n'}return __p},talkie.Models=talkie.Models||{},function(){"use strict";talkie.Models.TalkerModel=Backbone.Model.extend({url:"",initialize:function(){},defaults:{pitch:2,rate:1,volume:1,voices:[],chosenVoice:"Fred",supported:!0},validate:function(){},parse:function(a){return a}})}(),talkie.Views=talkie.Views||{},function(){"use strict";talkie.Views.TalkerView=Backbone.View.extend({el:$("#main"),template:JST["app/scripts/templates/talker.ejs"],events:{"click .voice-li":"setActiveVoice","click .play":"handleText","click .cancel":"cancelSpeech","change input[type='range']":"updateRangeSlider"},initialize:function(){var a=this,b=0,c=setInterval(function(){0===a.model.get("voices").length?(b++,a.model.set("voices",window.speechSynthesis.getVoices())):(clearInterval(c),a.render()),20===++b&&(a.model.set("supported",!1),clearInterval(c),a.render())},100)},render:function(){var a=this;this.$el.html(this.template(this.model.toJSON())),this.model.get("supported")||(this.$(".btn").attr("disabled",!0),this.$(".unsupported").removeClass("hidden")),this.setHighlightedVoice(this.chosenVoice),setInterval(function(){!speechSynthesis.speaking&&a.supported&&a.endAnimation()},500)},handleText:function(){var a=new SpeechSynthesisUtterance,b=this,c=this.$("textarea");""!==c.val()&&(this.beginAnimation(),a.voice=speechSynthesis.getVoices().filter(function(a){return a.name==b.model.get("chosenVoice")})[0],a.voiceURI="native",a.volume=this.model.get("volume"),a.rate=this.model.get("rate"),a.pitch=this.model.get("pitch"),a.text=this.$("textarea").val(),a.lang="en-US",this.$(".play").attr("disabled",!0),this.$(".cancel").removeAttr("disabled"),a.onend=function(){b.endAnimation()},a.onerror=function(a){console.log("speechSynthesis error :("),console.log(a)},speechSynthesis.speak(a))},cancelSpeech:function(){speechSynthesis.speaking&&speechSynthesis.cancel()},setHighlightedVoice:function(a){this.$(".voice-li").removeClass("active"),this.$("li[data-voice='"+a+"']").addClass("active")},setActiveVoice:function(a){a.preventDefault();var b=this.$(a.target).data("voice");this.model.set("chosenVoice",b),this.setHighlightedVoice(this.model.get("chosenVoice"))},beginAnimation:function(){this.$(".throbber").removeClass("hidden"),this.$(".play").attr("disabled",!0),this.$(".cancel").removeAttr("disabled")},endAnimation:function(){this.$(".throbber").addClass("hidden"),this.$(".play").removeAttr("disabled"),this.$(".cancel").attr("disabled",!0)},updateRangeSlider:function(a){var b=$(a.target),c=b[0].id;this.model.set(c,parseFloat(b.val(),10)),this.$("."+c+"-value").text(this.model.get(c))}})}();