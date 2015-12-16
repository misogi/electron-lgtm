# execute

electron

    npm install
    $(npm bin)/electron .

# compile

typescript

    npm -g typescript
    npm -g tsd
    tsd install
    # compile
    tsc -p .

## 実行

環境変数をセット

    # windows
    >set SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXX/XXXXX/XXXXX

    # Unix
    $ export SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXX/XXXXX/XXXXX
