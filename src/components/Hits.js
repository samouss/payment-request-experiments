import React from 'react';
import PropTypes from 'prop-types';
import { Highlight } from 'react-instantsearch/dom';
import { connectHits } from 'react-instantsearch/connectors';

const Hits = ({ hits, onHitClick }) => (
  <div style={{ marginTop: '1.5rem' }}>
    {hits.map(hit => (
      <div key={hit.objectID} className="card">
        <div className="card-content is-clearfix">
          <div className="content">
            <p className="title is-5">
              <Highlight hit={hit} attribute="name" tagName="mark" />
            </p>
            <Highlight hit={hit} attribute="description" tagName="mark" />
          </div>
          <button
            className="button is-link is-pulled-right"
            onClick={onHitClick}
          >
            ${hit.price}
          </button>
        </div>
      </div>
    ))}
  </div>
);

const HitPropTypes = PropTypes.shape({
  objectID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
});

Hits.propTypes = {
  hits: PropTypes.arrayOf(HitPropTypes).isRequired,
  onHitClick: PropTypes.func.isRequired,
};

export default connectHits(Hits);
