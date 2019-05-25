/**
 *
 * Section
 *
 */

import React from 'react';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const innerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
function Loading() {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={innerStyle}>
        <RingLoader sizeUnit={'px'} size={150} color={'red'} loading={true} />
      </div>
    </div>
  );
}

Loading.propTypes = {};

export default Loading;
