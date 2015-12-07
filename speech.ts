'use strict';
import {Zatsudan} from './zatsudan';

export class Speech {
  private recognition: SpeechRecognition;
  private synth: SpeechSynthesisUtterance;
  private context: string;

  constructor() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'ja-JP';

    this.synth = new SpeechSynthesisUtterance();
    this.synth.volume = 1;
    this.synth.rate = 1;
    this.synth.pitch = 1;
    this.synth.lang = 'ja-JP';

    const zatsudan = new Zatsudan();

    const indicator = document.getElementById('indicator');
    const recordButton = document.getElementById('record');
    const recordCircle = document.getElementById('record-circle');
    const inputBalloon = document.getElementById('input-balloon');
    const outputBalloon = document.getElementById('output-balloon');
    const resultImage = document.getElementById('display');
    const voicesArea = document.getElementById('voices');

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const inputText: string = event.results.item(0).item(0).transcript;
        inputBalloon.innerText = inputText;

        this.show(voicesArea);

        let responceVoice: string;
        if (inputText.match(/ハッピーグルメ弁当/)) {
          responceVoice = 'どんどん？';
          this.show(resultImage);
          resultImage.setAttribute('src', 'img/dondon.jpg');
        } else {
          this.hide(resultImage);
          zatsudan.talk(inputText, this.context).on('data', (res) => {
            const json = JSON.parse(res);
            responceVoice = json.utt;
            this.context = json.context;
            this.synth.text = responceVoice;
            outputBalloon.innerText = responceVoice;
            speechSynthesis.speak(this.synth);
          })
        }
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

  private show(elem: HTMLElement) {
            elem.classList.add('visible');
            elem.classList.remove('collapse');
  }

  private hide(elem: HTMLElement) {

              elem.classList.add('collapse');
              elem.classList.remove('visible');
  }
}
