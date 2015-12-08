'use strict';
import {Zatsudan} from './zatsudan';
import {Slack} from './slack';

export class Speech {
  private recognition: SpeechRecognition;
  private synth: SpeechSynthesisUtterance;
  private context: string;
  private outputArea: HTMLElement;

  constructor() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'ja-JP';

    this.synth = new SpeechSynthesisUtterance();
    this.synth.volume = 1;
    this.synth.rate = 1;
    this.synth.pitch = 1;
    this.synth.lang = 'ja-JP';

    const zatsudan = new Zatsudan();
    const slack = new Slack();

    const indicator = document.getElementById('indicator');
    const recordButton = document.getElementById('record');
    const recordCircle = document.getElementById('record-circle');
    const inputBalloon = document.getElementById('input-balloon');
    const outputBalloon = document.getElementById('output-balloon');
    const resultImage = document.getElementById('display');
    this.outputArea = document.getElementById('output-area');
    const isSlackMode: HTMLInputElement = <HTMLInputElement>document.getElementById('is-slack-mode');

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const inputText: string = event.results.item(0).item(0).transcript;
      inputBalloon.innerText = inputText;
      this.show(inputBalloon);

      if (isSlackMode.checked) {
        slack.send(inputText).on('data', (res) => {
          outputBalloon.innerHTML = '<i class="fa fa-slack"></i>';
          this.show(this.outputArea);
        });
      } else if (inputText.match(/ハッピーグルメ弁当/)) {
        this.show(resultImage);
        resultImage.setAttribute('src', 'img/dondon.jpg');
        this.speech('どんどん？', outputBalloon);
      } else if (inputText.match(/勉強会と/)) {
        this.show(resultImage);
        resultImage.setAttribute('src', 'img/hmrb.png');
        this.speech('浜松ルビー', outputBalloon);
      } else {
        zatsudan.talk(inputText, this.context).on('data', (res) => {
          const json = JSON.parse(res);
          this.context = json.context;
          this.speech(json.utt, outputBalloon);
        }).on('error', (err) => {
          this.speech('エラー', outputBalloon);
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
      this.hide(this.outputArea);
      this.hide(resultImage);
      this.recognition.start();
      indicator.innerText = 'しゃべってください';
      recordCircle.classList.add('active');
    };
  }

  private show(elem: HTMLElement): void {
    elem.classList.remove('collapse');
    elem.classList.add('visible');
  }

  private hide(elem: HTMLElement): void {
    elem.classList.remove('visible');
    elem.classList.add('collapse');
  }

  private speech(res: string, elem: HTMLElement): void {
    this.synth.text = res;
    elem.innerText = res;
    speechSynthesis.speak(this.synth);
    this.show(this.outputArea);
  }
}
