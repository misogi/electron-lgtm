'use strict';
class Speech
{
  constructor() {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'ja-JP';

    const msg = new SpeechSynthesisUtterance();
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1;
    msg.lang = 'ja-JP';
    const indicator = document.getElementById("indicator");
    const recordButton = document.getElementById("record");
    const recordCircle = document.getElementById("record-circle");
    const inputBalloon = document.getElementById("input-balloon");
    const disp = document.getElementById("display");

    recognition.onresult = (event) => {
        const inputText = event.results.item(0).item(0).transcript;
        let responceVoice;
        if (inputText.match(/ハッピーグルメ弁当/)) {
          responceVoice = 'どんどん？';
          disp.setAttribute('src', 'img/dondon.jpg');
        } else {
          responceVoice = inputText;
        }

        inputBalloon.innerText = inputText;
        msg.text = responceVoice;
        speechSynthesis.speak(msg);
    };

    recognition.onnomatch = () => {
        resultText.innerText = "もう一度試してください";
    };

    recognition.onend = () => {
        recordCircle.classList.remove("active");
        indicator.innerText = "";
    }

    recordButton.onclick = () => {
        recognition.start();
        indicator.innerText = "しゃべってください";
        recordCircle.classList.add("active");
    };
  }
}

module.exports = Speech;
