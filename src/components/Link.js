import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ children, ...props }) => (
  <a {...props} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

Link.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Link;
