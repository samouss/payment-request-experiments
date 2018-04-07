import React from 'react';
import { connectSearchBox } from 'react-instantsearch/connectors';

const SearchBox = ({ currentRefinement, refine }) => (
  <input
    className="input is-large"
    type="search"
    value={currentRefinement}
    placeholder="Apple iPhone 5S, Samsung Galaxy S9, ..."
    onChange={event => refine(event.currentTarget.value)}
  />
);

export default connectSearchBox(SearchBox);
