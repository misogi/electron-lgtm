'use strict';
import * as request from 'request';
export class Slack {
  private httpOptions: request.Options;

  constructor() {
    this.httpOptions = {
      uri: process.env.SLACK_WEBHOOK_URL
    };
  }

  public send(msg: string): request.Request {
    if (!this.httpOptions.uri) {
      console.log('slack URL is empty! specify env.SLACK_WEBHOOK_URL');
      return null;
    }

    this.httpOptions.json = {
      channel: '#new-end-of-year',
      text: msg,
      username: 'Slackおじさん Electron版',
      icon_url: 'http://blog-imgs-65.fc2.com/t/a/k/takatibi00/fvg5fcgbcgnz.jpg',
    };

    return request.post(this.httpOptions);
  }
}
