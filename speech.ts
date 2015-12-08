'use strict';
import {Zatsudan} from './zatsudan';
import {Slack} from './slack';

export class Speech {
  private recognition: SpeechRecognition;
  private synth: SpeechSynthesisUtterance;
  private context: string;
  private outputArea: HTMLElement;
  private outputBalloon: HTMLElement;

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
    const resultImage = document.getElementById('display');
    this.outputBalloon = document.getElementById('output-balloon');
    this.outputArea = document.getElementById('output-area');
    const isSlackMode: HTMLInputElement = <HTMLInputElement>document.getElementById('is-slack-mode');

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const inputText: string = event.results.item(0).item(0).transcript;
      inputBalloon.innerText = inputText;
      this.show(inputBalloon);

      if (isSlackMode.checked) {
        const response = slack.send(inputText);
        if (!response) {  
          this.speak('エラー');
        } else {
          response.on('data', (res) => {
            this.outputBalloon.innerHTML = '<i class="fa fa-slack"></i>';
            this.show(this.outputArea);
          }); 
        }
      } else if (inputText.match(/ハッピーグルメ弁当/)) {
        this.show(resultImage);
        resultImage.setAttribute('src', 'img/dondon.jpg');
        this.speak('どんどん？');
      } else if (inputText.match(/勉強会と/)) {
        this.show(resultImage);
        resultImage.setAttribute('src', 'img/hmrb.png');
        this.speak('浜松ルビー');
      } else {
        zatsudan.talk(inputText, this.context).on('response', (res) => {
          if (res.statusCode === 200) {
            res.on('data', (data) => {
              const json = JSON.parse(data);
              this.context = json.context;
              this.speak(json.utt);
            }); 
          } else {
            this.speak('エラー');
          }
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

  private speak(res: string): void {
    this.synth.text = res;
    this.outputBalloon.innerText = res;
    speechSynthesis.speak(this.synth);
    this.show(this.outputArea);
  }
}
