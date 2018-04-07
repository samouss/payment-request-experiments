import React, { Component, Fragment } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch/dom';
import SearchBox from './components/SearchBox';
import Hits from './components/Hits';

const isPaymentRequestSupported = 'PaymentRequest' in window;

class App extends Component {
  onHitClick = hit => {
    if (!isPaymentRequestSupported) {
      return;
    }

    console.log(hit);
  };

  render() {
    return (
      <Fragment>
        <section className="hero is-medium is-dark is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Payment Request API</h1>
              <h2 className="subtitle">
                Algolia React InstantSearch + Payment Request API.
              </h2>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            {!isPaymentRequestSupported && (
              <div className="notification is-danger">
                Your browser doesn't support <a href="">PaymentRequest</a>.
              </div>
            )}

            <div className="notification">
              This is an experiments using{' '}
              <a href="">Algolia React InstantSearch</a> &{' '}
              <a href="">PaymentRequest</a> APIs. You can find the code on{' '}
              <a href="">GitHub</a>.
            </div>

            <InstantSearch
              appId="latency"
              apiKey="6be0576ff61c053d5f9a3225e2a90f76"
              indexName="instant_search"
            >
              <Configure hitsPerPage={5} />

              <SearchBox />
              <Hits onHitClick={this.onHitClick} />
            </InstantSearch>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default App;
