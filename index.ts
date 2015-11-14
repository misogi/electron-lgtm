'use strict';

var button = document.getElementById("fetch");
var disp = document.getElementById("display");
var request = require('request');
var options = {
  url: 'http://www.lgtm.in/g',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

button.onclick = () => {
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      disp.setAttribute('src', info.imageUrl);
    }
  });
};

var recognition = new webkitSpeechRecognition();
recognition.lang = 'ja-JP';

var msg = new SpeechSynthesisUtterance();
msg.volume = 1;
msg.rate = 1;
msg.pitch = 1;
msg.lang = 'ja-JP';

var resultText = document.getElementById("result");
var recordButton = document.getElementById("record");

recognition.onresult = function(event){
    var text = event.results.item(0).item(0).transcript;
    resultText.innerText = text;
    msg.text = text;
    speechSynthesis.speak(msg);
};

recognition.onnomatch = function(){
    resultText.innerText = "もう一度試してください";
};

recordButton.onclick = () => {
    recognition.start();
}
