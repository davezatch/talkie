this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/talker.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<section id="talker">\n\n    <p class="text-danger unsupported hidden">\n        Ack! looks like this browser isn\'t supported :( Unfortunately, you will currently have to try with either Safari or Chrome until Mozilla adds further speechSynthesis support to Firefox.\n    </p>\n\n    <p>\n        Text to Speech! HTML5 is just the best. Enter some text in the box and hit <span class="text-success"><strong>play</strong></span> to listen to it.\n    </p>\n\n    <textarea class="form-control" rows="3" name="talkerText">Try me! Just press "Play"</textarea>\n\n    <div class="button-wrapper">\n        <button class="btn btn-large btn-success play">\n            <span class="glyphicon glyphicon-play"></span> Play!\n        </button>\n        <button class="btn btn-large btn-danger cancel" disabled>\n            <span class="glyphicon glyphicon-stop"></span> Stop the madness!\n        </button>\n        <div class="throbber hidden">\n            Loading...\n        </div>\n    </div>\n\n        <p class="text-info">\n            You can change some voice options (some only apply to certain voices)\n        </p>\n        <ul class="range-list">\n            <li>\n                <label for="pitch">Pitch: <span class="range-value pitch-value">' +
((__t = ( pitch )) == null ? '' : __t) +
'</span></label>\n                <input type="range" name="pitch" id="pitch" min="0" max="2" step="0.1" value="' +
((__t = ( pitch )) == null ? '' : __t) +
'">\n            </li>\n            \n            <li>\n                <label for="rate">Rate: <span class="range-value rate-value">' +
((__t = ( rate )) == null ? '' : __t) +
'</span></label>\n                <input type="range" name="rate" id="rate" min="0.1" max="10" step="0.1" value="' +
((__t = ( rate )) == null ? '' : __t) +
'">\n            </li>\n            <li>\n                <label for="volume">Volume: <span class="range-value volume-value">' +
((__t = ( volume )) == null ? '' : __t) +
'</span></label>\n                <input type="range" name="volume" id="volume" min="0" max="1" step="0.1" value="' +
((__t = ( volume )) == null ? '' : __t) +
'">\n            </li>\n        </ul>\n\n\n\n\n        <br>\n        <p class="text-info">\n            These are the voices supported by your browser and OS. Click on any of them to try:\n        </p>\n\n        <ul id="voice-list">\n            ';
 for(var i=0; i < voices.length; i++) { ;
__p += '\n                <li class="voice-li" data-voice="' +
((__t = ( voices[i].name )) == null ? '' : __t) +
'">' +
((__t = ( voices[i].name )) == null ? '' : __t) +
'</li>\n            ';
 } ;
__p += '\n        </ul>\n\n    <p class="bg-warning">\n        Note: sometimes it seems to stop working, and only resumes working if you restart the browser. Not sure why yet.\n    </p>\n\n</section>\n';

}
return __p
};