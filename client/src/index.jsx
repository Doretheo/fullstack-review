import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
      // data: false/true/null
    }
    this.search = this.search.bind(this);
    this.getRepos = this.getRepos.bind(this);
  }

  componentDidMount() {
    this.getRepos();
    // conditional rerender and populate container
  }

  search (term) {
    console.log(`${term} was searched`);
    axios.post('/repos', {
      login: term
    })
    .then((res) => {console.log(res)})
    .then(this.getRepos)
    .catch((err) => {console.log(err)})
  }

  getRepos() {
    axios.get('/repos')
      .then(res => this.setState({
        repos: res.data
      }))
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));