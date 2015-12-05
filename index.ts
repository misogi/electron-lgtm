'use strict';

const button = document.getElementById("fetch");
const disp = document.getElementById("display");
const request = require('request');
const options = {
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

const recognition = new webkitSpeechRecognition();
recognition.lang = 'ja-JP';

const msg = new SpeechSynthesisUtterance();
msg.volume = 1;
msg.rate = 1;
msg.pitch = 1;
msg.lang = 'ja-JP';
const resultText = document.getElementById("result");
const indicator = document.getElementById("indicator");
const recordButton = document.getElementById("record");
const recordCircle = document.getElementById("record-circle");
const inputBalloon = document.getElementById("input-balloon");

recognition.onresult = (event) => {
    const inputText = event.results.item(0).item(0).transcript;
    let responceVoice;
    if (text.match(/ハッピーグルメ弁当/)) {
      responceVoice = 'どんどん？';
      disp.setAttribute('src', 'img/dondon.jpg');
    } else {
      responceVoice = inputText;
    }

    inputBalloon.innerText = inputText;
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

const httpOptions = {
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
