/* jslint esversion: 6, node: true */
'use strict';
var fs = require('fs');
var path = require('path');
var uploader = require('github-ipa-uploader');


function updateReleasesJson(version, build) {

  var releasesFilePath = path.join(__dirname, 'release.json');

  return new Promise( (resolve, reject) => {

    fs.readFile(releasesFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }).then( data => {

    var releases = JSON.parse(data);
    


  });
}



var options = {
  token: '7bad60430f074bcfaebf522cb68fb94a64b28767',
  owner: 'eddy-lau',
  repo: 'ota',
  binaries: [{
    path: path.join(__dirname,'..','ChineseDailyBread', 'ChineseDailyBreadAdhoc.ipa'),
    iconURL: 'https://eddy-lau.github.io/ota/cdb/AppIcon-120x120.png'
  }],
  tagPrefix: 'cdb'
};

uploader.upload(options)
.then( result => {
  console.log('\n');



  console.log(result);
}).catch( error => {
  console.error(error);
});
