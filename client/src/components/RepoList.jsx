import React from 'react';
import RepoEntry from './RepoEntry.jsx';

function RepoList (props) {

  let eachRepo = props.repos.map((repo) => (
    <RepoEntry
      repo={repo}
    />
  ))
  return (
    <div>
      <div>
        <h4> Repo List Component </h4>
        There are {props.repos.length} repos.
      </div>
      {eachRepo}
    </div>
  )
}

export default RepoList;