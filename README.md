## requirement

electron

    npm install

typescript

    npm -g typescript

tsd

    npm -g tsd
    tsd install

## 実行

環境変数をセット

    # windows
    >set SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXX/XXXXX/XXXXX

    # Unix
    $ export SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXX/XXXXX/XXXXX

実行

    $(npm bin)/electron .
