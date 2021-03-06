'use strict';
import * as request from 'request';
export class Zatsudan {
  private url: string;

  constructor() {
    const key = process.env.ZATSUDAN_API_KEY;
    this.url = 'https://api.apigw.smt.docomo.ne.jp/dialogue/v1/dialogue?' +
    'APIKEY=' + key;
  }

  public talk(input: string, context: string): request.Request {
    const params = {
      url: this.url,
      method: 'POST',
      json: {
        utt: input,
        context: context,
        bloodtype: 'B',
        mode: 'dialog'
      }
    };

    return request.post(params);
  }
}
