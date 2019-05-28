/**
 *
 * SettingsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Nav,
  Tabs,
  Tab,
  Row,
  Col,
  Container,
  ListGroup,
  Sonnet,
} from 'react-bootstrap';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSettingsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function SettingsPage() {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });

  return (
    <div className="background-for-container">
      <Container>
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            margin: 'auto',
            width: '70%',
            height: '60vh',
            border: '6px solid black',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            backgroundColor: '#EFF7D4',
          }}
        >
          <Tabs
            style={{
              backgroundColor: 'white',
            }}
            className="settings-tabs"
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
          >
            <Tab eventKey="home" title="Home">
              <div style={{ height: '100%' }}>Hi!</div>
            </Tab>
            <Tab eventKey="profile" title="Profile">
              <div>Hfefi!</div>
            </Tab>
            <Tab eventKey="contact" title="Contact">
              <div>Hhgfdi!</div>
            </Tab>
          </Tabs>
        </div>
      </Container>
    </div>
  );
}

SettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settingsPage: makeSelectSettingsPage(),
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

export default compose(withConnect)(SettingsPage);
