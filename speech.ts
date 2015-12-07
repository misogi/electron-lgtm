'use strict';
export class Speech {
  private recognition: SpeechRecognition;
  private synth: SpeechSynthesisUtterance;

  constructor() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'ja-JP';

    this.synth = new SpeechSynthesisUtterance();
    this.synth.volume = 1;
    this.synth.rate = 1;
    this.synth.pitch = 1;
    this.synth.lang = 'ja-JP';

    const indicator = document.getElementById('indicator');
    const recordButton = document.getElementById('record');
    const recordCircle = document.getElementById('record-circle');
    const inputBalloon = document.getElementById('input-balloon');
    const outputBalloon = document.getElementById('output-balloon');
    const resultImage = document.getElementById('display');
    const voicesArea = document.getElementById('voices');

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const inputText: string = event.results.item(0).item(0).transcript;
        let responceVoice: string;
        if (inputText.match(/ハッピーグルメ弁当/)) {
          responceVoice = 'どんどん？';
          resultImage.setAttribute('src', 'img/dondon.jpg');
        } else {
          responceVoice = inputText;
        }

        inputBalloon.innerText = inputText;
        this.synth.text = responceVoice;
        outputBalloon.innerText = responceVoice;
        speechSynthesis.speak(this.synth);
        voicesArea.classList.add('visible');
        voicesArea.classList.remove('collapse');
    };

    this.recognition.onnomatch = () => {
        inputBalloon.innerText = 'もう一度試してください';
    };

    this.recognition.onend = () => {
        recordCircle.classList.remove('active');
        indicator.innerText = '';
    };

    recordButton.onclick = () => {
        this.recognition.start();
        indicator.innerText = 'しゃべってください';
        recordCircle.classList.add('active');
        voicesArea.classList.add('collapse');
        voicesArea.classList.remove('visible');
    };
  }
}
