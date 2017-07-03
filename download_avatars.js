var request = require("request");

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var githubURL = `https://github.com/${repoOwner}/${repoName}`;

  request.get(githubURL);
  console.log("hey");

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
})