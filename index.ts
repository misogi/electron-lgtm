'use strict';
import https = require('https');
import querystring = require('querystring');

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
var indicator = document.getElementById("indicator");
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

recognition.onend = function(){
    indicator.innerText = "";
}

var postData = JSON.stringify({
  'text': 'こんにちは世界'
});

var httpOptions = {
  hostname: 'hooks.slack.com',
  path: '/services/T02JVGSTV/B09A11T7S/IoLVQ8RalaDsfJVSg8tTngPH',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

var req = https.request(httpOptions, function(res) {
  res.setEncoding('utf8');
  res.on('data', function(chunk){
    console.log('Body: ' + chunk);
  });
  res.on('end', function() {
    console.log('end');
  })
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

recordButton.onclick = () => {
    recognition.start();
    indicator.innerText = "しゃべってください";
    req.write(postData, 'utf8');
    req.end();
}
