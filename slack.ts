'use strict';
class Slack
{
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

  send(msg: string): void {
    if (!this.httpOptions.url) {
      console.log('slack URL is empty! specify env.SLACK_WEBHOOK_URL')
      return;
    }
    this.httpOptions.body = JSON.stringify({
      'text': msg
    });
    request.post(this.httpOptions, (err, res, body) => {
    });
  }
}

module.exports = Slack;
