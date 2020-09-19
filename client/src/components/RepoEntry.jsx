import React from 'react';

const RepoEntry = ({repo}) => {
  const {__v, _id, created_at, id, language, login, name, node_id, size, watchers} = repo
  return (

    <div>
      <li>{name}: {size}</li>
    </div>
  )
}


export default RepoEntry;