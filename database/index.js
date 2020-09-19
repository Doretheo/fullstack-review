const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  node_id: String,
  name: String,
  added: Boolean,
  login: String,
  size: Number,
  language: String,
  created_at: Date,
  update_at: Date,
  watchers: Number
});

// create a model object with the schema, store inside Repo
let Repo = mongoose.model('Repo', repoSchema);

let saveRepo = (repo) => {

  const document = new Repo ({
    id: repo.id,
    node_id: repo.node_id,
    name: repo.name,
    added: repo.added,
    login: repo.login,
    size: repo.size,
    language: repo.language,
    created_at: repo.created_at,
    update_at: repo.update_at,
    watchers: repo.watchers
  })
  document.save((err) => {
    if (err) {
      // return handleError(err)
      console.log(err)
    }
  })

  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

let getRepos = ((cb) => {
  Repo.find({}).sort({'size': -1}).limit(25)
    .then(res => {cb(null, res)})
    .catch(console.log)

})

// when import data, make sure all key-values pairs are the same with the same structure

module.exports.saveRepo = saveRepo;
module.exports.getRepos = getRepos;
// url to the repo
