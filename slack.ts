'use strict';
import * as request from 'request';
export class Slack {
  private httpOptions: any;

  constructor() {
    this.httpOptions = {
      uri: process.env.SLACK_WEBHOOK_URL,
      body: null,
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }

  public send(msg: string): request.Request {
    if (!this.httpOptions.uri) {
      console.log('slack URL is empty! specify env.SLACK_WEBHOOK_URL');
      return;
    }
    this.httpOptions.body = JSON.stringify({
      text: msg,
      channel: '#new-end-of-year',
      username: 'Slackおじさん Electron版',
      icon_url: 'http://blog-imgs-65.fc2.com/t/a/k/takatibi00/fvg5fcgbcgnz.jpg'
    });
    return request.post(this.httpOptions);
  }
}
