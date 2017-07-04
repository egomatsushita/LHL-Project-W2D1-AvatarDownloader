var request = require("request");
var fs = require('fs');
require('dotenv').config();
var arg = process.argv.slice(2);
var repoOwner = arg[0];
var repoName = arg[1];

// Variables that get GitHub user and token from a hidden file
var GITHUB_USER = process.env.DB_USER;
var GITHUB_TOKEN = process.env.DB_TOKEN;

// Checking if there are two command line arguments
if(arg.length !== 2) {
  console.log("*** Please input repo-owner and repo-name ***\nAnd follow this pattern: node <file> <owner> <repo>");
  return;
}

// Function that request for a GitHub content and retrieves users data
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

// Function that download GitHub avatar image by passing an url and a path as parameters
function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function(err) {
          throw err;
         })
         .on('response', function(response) {

         })
         .pipe(fs.createWriteStream(filePath));
}

// Calling getRepoContributors function
getRepoContributors(repoOwner, repoName, function(err, result) {
  downloadImageByURL(result.avatar_url, `./avatars/${result.login}.jpg`);
});

