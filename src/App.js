import React, { Component, Fragment } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch/dom';
import PaymentStatus from './components/PaymentStatus';
import SearchBox from './components/SearchBox';
import Hits from './components/Hits';
import { createRequest } from './payment';
import { processPayment } from './client';

const isPaymentRequestSupported = 'PaymentRequest' in window;

class App extends Component {
  state = {
    isPaymentComplete: false,
    isPaymentSuccess: true,
  };

  onHitClick = hit => {
    if (!isPaymentRequestSupported) {
      return;
    }

    const request = createRequest({
      name: hit.name,
      price: hit.price,
    });

    request
      .show()
      .then(response => {
        return processPayment(response)
          .then(() => {
            this.setState(() => ({
              isPaymentComplete: true,
              isPaymentSuccess: true,
            }));

            return response.complete('success');
          })
          .catch(() => {
            this.setState(() => ({
              isPaymentComplete: true,
              isPaymentSuccess: false,
            }));

            return response.complete('fail');
          });
      })
      .catch(err => {
        // UI Abort
      });
  };

  render() {
    const { isPaymentComplete, isPaymentSuccess } = this.state;

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

            {isPaymentComplete && <PaymentStatus success={isPaymentSuccess} />}

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
