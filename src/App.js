import React, { Component } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch/dom';
import SearchBox from './components/SearchBox';
import Hits from './components/Hits';

class App extends Component {
  onClick = hit => {
    console.log(hit);
  };

  render() {
    return (
      <section className="section">
        <div className="container">
          <InstantSearch
            appId="latency"
            apiKey="6be0576ff61c053d5f9a3225e2a90f76"
            indexName="instant_search"
          >
            <Configure hitsPerPage={8} />
            <SearchBox />
            <Hits onClick={this.onClick} />
          </InstantSearch>
        </div>
      </section>
    );
  }
}

export default App;
