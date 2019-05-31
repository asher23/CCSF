import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Container,
  Form,
  FormControl,
  Button,
  Carousel,
  Col,
  Row,
} from 'react-bootstrap';
import Loading from 'components/Loading';
import {
  applyToCodeLab,
  acceptApplication,
  rejectApplication,
} from './actions';

import makeSelectCodeLabPage, { makeSelectUser } from './selectors';

export function Joining({ dispatch, codeLabPage, user, authStatus }) {
  const [message, setMessage] = useState('');
  const [yourApplication, setYourApplication] = useState('');
  const { title, joining, applications } = codeLabPage.codeLab;
  useEffect(() => {
    applications.forEach(application => {
      if (application.applicant.id === user.id) setYourApplication(application);
    });
  }, []);

  console.log('applications', applications);

  if (!codeLabPage.codeLab) return <Loading />;
  console.log('yourapplication', yourApplication);

  return (
    <Container
      fluid
      style={{
        backgroundColor: 'rgb(239,247,212, 0.3)',
        minHeight: '100vh',
        marginTop: '-60px',
        paddingTop: '70px',
      }}
    >
      <h1>Here's how you can apply</h1>
      <p>{joining}</p>
      <Form.Group>
        <Form.Label>Please enter a message to send to the team</Form.Label>
        <Form.Control
          onChange={e => setMessage(e.target.value)}
          value={message}
          as="textarea"
          rows="3"
        />
      </Form.Group>
      <Button
        disabled={authStatus === 'authenticated' || yourApplication !== ''}
        onClick={() => {
          dispatch(
            applyToCodeLab(codeLabPage.codeLab.id, {
              applicantId: user.id,
              message,
            }),
          );
        }}
      >
        Apply!
      </Button>
      {authStatus === 'authenticated' && (
        <>
          <Row>
            <hr
              size="20px"
              style={{ width: '100%', border: '5px solid black' }}
            />
            <br />
            <h4>
              All applications. Only members on your team can see this part of
              the page.
            </h4>
          </Row>
          {applications.map(application => {
            return (
              <div
                style={{
                  padding: '30px',
                }}
              >
                <hr style={{ border: '2px solid black' }} />
                <Row>
                  <Col>
                    <h4>Username: {application.applicant.username}</h4>
                  </Col>

                  <Col>
                    <h4>
                      Full Name: {application.applicant.firstName}{' '}
                      {application.applicant.lastName}
                    </h4>
                  </Col>
                  <Col>
                    <h4>Status: {application.status}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>{application.message}</p>
                  </Col>
                </Row>
                {application.status !== 'accepted' && (
                  <>
                    <Button
                      onClick={() => {
                        dispatch(
                          acceptApplication(
                            codeLabPage.codeLab.id,
                            application.applicant.id,
                          ),
                        );
                      }}
                    >
                      Accept
                    </Button>
                    {application.status !== 'rejected' && (
                      <Button
                        onClick={() => {
                          dispatch(
                            rejectApplication(
                              codeLabPage.codeLab.id,
                              application.applicant.id,
                            ),
                          );
                        }}
                      >
                        Reject
                      </Button>
                    )}
                  </>
                )}
                <hr style={{ border: '2px solid black' }} />
              </div>
            );
          })}
        </>
      )}
      {yourApplication.message && (
        <div>
          You've applied already. Below is your application status.
          <div
            style={{
              padding: '30px',
            }}
          >
            <hr style={{ border: '2px solid black' }} />
            <Row>
              <h4>Application Status: {yourApplication.status}</h4>
            </Row>
            <Row>
              <Col>
                <h6>Your message</h6>
                <p>{yourApplication.message}</p>
              </Col>
            </Row>

            <hr style={{ border: '2px solid black' }} />
          </div>
        </div>
      )}
    </Container>
  );
}
Joining.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  codeLabPage: makeSelectCodeLabPage(),
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

export default compose(withConnect)(Joining);
