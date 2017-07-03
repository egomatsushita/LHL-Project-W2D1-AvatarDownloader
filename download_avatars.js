var request = require("request");
var fs = require('fs');
var arg = process.argv.slice(2);
var repoOwner = arg[0];
var repoName = arg[1];

var GITHUB_USER = "egomatsushita";
var GITHUB_TOKEN = "568b7c134d4568ef1761d64d7a9d4242944630f6";

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  var requestOptions = {
    url: requestURL,
    headers: {
      'User-Agent': 'egomatsushita'
    }
  }

  request(requestOptions, function(err, response, body) {
    if(err) {
      throw err;
    }
    if(response.statusCode === 200) {
      var json = JSON.parse(body);
      for(var avatar of json) {
        cb(err, avatar);
      }
    }
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function(err) {
          throw err;
         })
         .on('response', function(response) {

         })
         .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(repoOwner, repoName, function(err, result) {
  downloadImageByURL(result.avatar_url, `./avatars/${result.login}.jpg`);
});

