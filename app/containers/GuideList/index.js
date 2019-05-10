/**
 *
 * GuideList
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGuideList from './selectors';
import reducer from './reducer';
import saga from './saga';
import { setGuides, getGuides, logout } from './actions';

export function GuideList(props) {
  const { dispatch } = props;

  useInjectReducer({ key: 'guideList', reducer });
  useInjectSaga({ key: 'guideList', saga });

  const [guidesList, setGuidesList] = useState('guidesList');

  useEffect(() => {
    const guidesToSet = dispatch(getGuides());
    console.log('gudeis', guidesToSet);
    // dispatch(getGuides());
  }, []);

  return <div />;
}

GuideList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  guideList: makeSelectGuideList(),
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

export default compose(withConnect)(GuideList);
