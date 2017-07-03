var request = require("request");
var GITHUB_USER = "egomatsushita";
var GITHUB_TOKEN = "568b7c134d4568ef1761d64d7a9d4242944630f6";

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var githubURL = `https://github.com/${repoOwner}/${repoName}`;
  var requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  request.get(githubURL);

  console.log(requestURL);

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
})