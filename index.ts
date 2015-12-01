'use strict';

let button = document.getElementById("fetch");
let disp = document.getElementById("display");
let request = require('request');
let options = {
  url: 'http://www.lgtm.in/g',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

button.onclick = () => {
  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      disp.setAttribute('src', info.imageUrl);
    }
  });
};

let recognition = new webkitSpeechRecognition();
recognition.lang = 'ja-JP';

let msg = new SpeechSynthesisUtterance();
msg.volume = 1;
msg.rate = 1;
msg.pitch = 1;
msg.lang = 'ja-JP';

let resultText = document.getElementById("result");
let indicator = document.getElementById("indicator");
let recordButton = document.getElementById("record");
let recordCircle = document.getElementById("record-circle");

recognition.onresult = (event) => {
    let text = event.results.item(0).item(0).transcript;
    let responceVoice;
    if (text.match(/ハッピーグルメ弁当/)) {
      responceVoice = 'どんどん？';
      disp.setAttribute('src', 'img/dondon.jpg');
    } else {
      responceVoice = text;
    }

    msg.text = resultText.innerText = responceVoice;
    speechSynthesis.speak(msg);
};

recognition.onnomatch = () => {
    resultText.innerText = "もう一度試してください";
};

recognition.onend = () => {
    recordCircle.classList.remove("active");
    indicator.innerText = "";
}

let httpOptions = {
  uri: process.env.SLACK_WEBHOOK_URL,
  body: JSON.stringify({
    'text': 'こんにちは世界'
  }),
  headers: {
    'Content-Type': 'application/json'
  }
};

recordButton.onclick = () => {
    recognition.start();
    indicator.innerText = "しゃべってください";
    recordCircle.classList.add("active");
    // request.post(httpOptions, (err, res, body) => {
    // });
};
