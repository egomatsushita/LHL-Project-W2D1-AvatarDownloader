var request = require("request");

var GITHUB_USER = "egomatsushita";
var GITHUB_TOKEN = "568b7c134d4568ef1761d64d7a9d4242944630f6";

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // var githubURL = `https://github.com/${repoOwner}/${repoName}`;
  var requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  console.log(requestURL);

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
    console.log("inside request", response.statusCode);
    if(response.statusCode === 200) {
      console.log("success");
      var json = JSON.parse(body);
      console.log(json);
    }

  });

  // console.log(requestURL);

}
    /*if(response.statusCode === 200) {
      var json = JSON.parse(body);
      // callback(json);
      for(var i = 0; i < r; i++) {
        var beer = json.data[i];
        console.log(beer.name);
      }
    }*/

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
})