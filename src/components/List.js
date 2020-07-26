import React from 'react';
import './../List.css'
const List = (props) => {
  const { repos, searchKey } = props;
  if (!repos || repos.length === 0) return <p>No repos, sorry</p>;

  const getReposFiltered = (repos, searchKey) => {
    if (searchKey !== undefined) {searchKey = searchKey.toLowerCase();}
    return repos.filter((repo) => {
      return repo.name.toLowerCase().includes(searchKey) || !searchKey
    })
  }
  const filteredRepos = getReposFiltered(repos, searchKey);


  return (
    <div>
      <ul>
      <h2 className='list-head'>Available Public Repositories</h2>
        {filteredRepos.map((repo) => {
          return (
            <div>
            <li key={repo.id} className='list'>
              <a href={repo.html_url} className='repo-text'>{repo.name}</a> <br/>
              <span className='repo-description'>{repo.description}</span>
            </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
export default List