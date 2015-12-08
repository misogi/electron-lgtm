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
    const outputArea = document.getElementById('output-area');

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const inputText: string = event.results.item(0).item(0).transcript;
        inputBalloon.innerText = inputText;
        this.show(inputBalloon);

        if (inputText.match(/ハッピーグルメ弁当/)) {
          this.show(resultImage);
          resultImage.setAttribute('src', 'img/dondon.jpg');
          this.speech('どんどん？', outputBalloon);
          this.show(outputArea);
        } else {
          this.hide(resultImage);
          zatsudan.talk(inputText, this.context).on('data', (res) => {
            const json = JSON.parse(res);
            this.context = json.context;
            this.speech(json.utt, outputBalloon);
            this.show(outputArea);
          });
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
      this.hide(inputBalloon);
      this.hide(outputArea);
      this.recognition.start();
      indicator.innerText = 'しゃべってください';
      recordCircle.classList.add('active');
    };
  }

  private show(elem: HTMLElement): void {
    elem.classList.add('visible');
    elem.classList.remove('collapse');
  }

  private hide(elem: HTMLElement): void {
    elem.classList.add('collapse');
    elem.classList.remove('visible');
  }

  private speech(res: string, elem: HTMLElement): void {
    this.synth.text = res;
    elem.innerText = res;
    speechSynthesis.speak(this.synth);
  }
}
