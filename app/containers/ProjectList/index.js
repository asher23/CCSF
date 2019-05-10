/**
 *
 * ProjectList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProjectList from './selectors';
import reducer from './reducer';
import saga from './saga';

export function ProjectList() {
  useInjectReducer({ key: 'projectList', reducer });
  useInjectSaga({ key: 'projectList', saga });

  return <div />;
}

ProjectList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectList: makeSelectProjectList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProjectList);
