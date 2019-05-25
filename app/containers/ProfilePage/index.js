/**
 *
 * ProfilePage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Container,
  Navbar,
  Form,
  FormControl,
  Button,
  Nav,
  Col,
  Row,
} from 'react-bootstrap';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProfilePage, { makeSelectUser } from './selectors';
import reducer from './reducer';
import saga from './saga';

export function ProfilePage({ profilePage, user }) {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });

  const [viewing, setViewing] = useState('viewing');
  console.log('props from profielpage', user);

  const renderView = () => {
    if (viewing === 'guides') {
      return <div>Guides</div>;
    }
    if (viewing === 'codeLabs') {
      return <div>CodeLAbs</div>;
    }
  };
  const switchStyle = { border: '2px solid red' };
  return (
    <Container>
      <Row>
        <Col sm={4}>
          <img
            style={{ maxWidth: '100%', maxHeight: '200px' }}
            src="https://images.unsplash.com/photo-1557436552-d1d884f1bb62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1138&q=80"
            alt="profile"
          />
        </Col>
        <Col sm={8}>
          <h3>Your information: </h3>
          <h6>{user.firstName}</h6>
          <h6>{user.lastName}</h6>
          <h6>{user.email}</h6>
        </Col>
      </Row>
      <Row>
        <Col onClick={() => setViewing('guides')} style={switchStyle} md={6}>
          Guides
        </Col>
        <Col onClick={() => setViewing('codeLabs')} style={switchStyle} md={6}>
          CodeLabs
        </Col>
      </Row>
      {renderView()}
    </Container>
  );
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
  user: makeSelectUser(),
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

export default compose(withConnect)(ProfilePage);
