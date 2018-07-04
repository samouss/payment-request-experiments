import React from 'react';
import PropTypes from 'prop-types';
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = ({ currentRefinement, refine }) => (
  <input
    className="input is-medium"
    type="search"
    value={currentRefinement}
    placeholder="Apple iPhone 5S, Samsung Galaxy S9, ..."
    onChange={event => refine(event.currentTarget.value)}
  />
);

SearchBox.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectSearchBox(SearchBox);
