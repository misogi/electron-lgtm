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

  public send(msg: string): void {
    if (!this.httpOptions.url) {
      console.log('slack URL is empty! specify env.SLACK_WEBHOOK_URL');
      return;
    }
    this.httpOptions.body = JSON.stringify({
      'text': msg
    });
    request.post(this.httpOptions);
  }
}
