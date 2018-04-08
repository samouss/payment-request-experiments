import React from 'react';
import PropTypes from 'prop-types';

const PaymentStatus = ({ success }) => (
  <div className={`notification is-${success ? 'success' : 'warning'}`}>
    <strong>
      {success ? 'Payment did complete.' : "Payment didn't complete."}
    </strong>
  </div>
);

PaymentStatus.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default PaymentStatus;
