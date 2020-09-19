const express = require('express');
var bodyParser = require('body-parser')
let app = express();
let axios = require('axios')
let db = require('../database/index.js')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  console.log('Connected to server side')
  // // TODO - your code here!
  const { login } = req.body
  // This route should take the github username provided
  axios.get(`https://api.github.com/users/${login}/repos`)
    // .then((res) => console.log('New search is: ' + res.data[0].id))
    .then(res => {
      const newArr = res.data.map((repo) => {
        // db.saveRepo(repo)
        return {
          id: repo.id,
          node_id: repo.node_id,
          name: repo.name,
          added: repo.added,
          login: repo.owner.login,
          size: repo.size,
          language: repo.language,
          created_at: repo.created_at,
          update_at: repo.update_at,
          watchers: repo.watchers
        }
      })
      newArr.map((repo) => {
        db.saveRepo(repo)
      })
    })
    // .then((repo) => console.log(repo))
    .catch(console.log)
  // and get the repo information from the github API, then
  // save the repo information in the database
});

////////////////////////

app.get('/repos', function (req, res) {
  // TODO - your code here!
  db.getRepos((err, data) => {
    if (err) {
      res.status(400).send()
    } else {
      console.log(data, req.query)
      res.status(200).send(data)
    }
  })
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

