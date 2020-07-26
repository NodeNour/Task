import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import withListLoading from './components/withListLoading';

function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
    searchKey: "",
    repoUsername: 'rengil',
    userNameCopy: ""
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://api.github.com/users/${appState.repoUsername}/repos`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: false, repos: repos, repoUsername: appState.repoUsername });
      });
  }, [setAppState]);
  
  return (
    <div className='App'>
      <div className='container'>
        <h1>My Repositories</h1>
        <h2>Username: {appState.repoUsername}</h2>
        Filter Repos: 
        <input 
        type="text"
        placeholder="Enter repository name..."
        onChange={event => setAppState({ repos: appState.repos, searchKey: event.target.value, repoUsername: appState.repoUsername })}>
        </input>
      </div>
      <div className='repo-container'>
        <ListLoading isLoading={appState.loading} repos={appState.repos} searchKey={appState.searchKey}/>
      </div>
    </div>
  );
}
export default App;