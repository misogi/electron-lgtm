/// <reference path="typings/node/node.d.ts" />
var hoge:string = 'hoge';
document.write(hoge);
var button = document.getElementById("fetch");
var disp = document.getElementById("display");
var request = require('request');
var options = {
  url: 'http://www.lgtm.in/g',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};
button.onclick = () => {
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      disp.setAttribute('src', info.imageUrl);
    }
  });
};
