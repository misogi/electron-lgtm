'use strict';

var glob = require('glob');

var fileUtil = {
  fetchReadmeList: function (cb) {
    glob('node_modules/**/README.md', function (err, matches) {
      if(err) {
        cb(err, null);
        return;
      }
      cb(null, matches);
    });
  }
};

module.exports = fileUtil;
