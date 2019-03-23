/* jslint esversion: 6, node: true */
'use strict';
var fs = require('fs');
var path = require('path');
var uploader = require('github-ipa-uploader');


function updateReleasesJson(version, build) {

  var releasesFilePath = path.join(__dirname, 'releases.json');

  return new Promise( (resolve, reject) => {

    if (fs.existsSync(releasesFilePath)) {
      fs.readFile(releasesFilePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    } else {
      resolve('[]');
    }

  }).then( data => {

    var releases = JSON.parse(data);
    releases = releases || [];

    var existingRelease = releases.find( release => {
      return release.version == version &&
             release.buildNumber == build;
    });

    if (existingRelease) {
      console.info('Not updating releases.json. Release info already exists');
      return;
    }

    var latestRelease = releases[0];

    var newRelease = {
      version: version,
      buildNumber: build,
      changes: latestRelease ? latestRelease.changes : []
    };

    releases.splice(0, 0, newRelease);

    return new Promise( (resolve, reject) => {
      fs.writeFile(releasesFilePath, JSON.stringify(releases, null, 2), err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });

    });

  });
}



var options = {
  token: process.env.GITHUB_TOKEN,
  owner: 'eddy-lau',
  repo: 'ota',
  binaries: [{
    path: path.join(__dirname,'..','ChineseDailyBread', 'ChineseDailyBreadAdhoc.ipa'),
    iconURL: 'https://eddy-lau.github.io/cdb-ota/AppIcon-120x120.png'
  }],
  tagPrefix: 'cdb'
};

uploader.upload(options)
.then( result => {
  console.log('\n');
  return updateReleasesJson(result.version, result.buildNumber);
}).catch( error => {
  console.error(error);
});
