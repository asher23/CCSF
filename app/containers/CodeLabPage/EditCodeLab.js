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
import { updateCodeLab } from './actions';

import makeSelectCodeLabPage from './selectors';

export function EditCodeLab({ dispatch, codeLabPage }) {
  const [editCodeLab, setEditCodeLab] = useState(codeLabPage.codeLab);
  useEffect(() => {
    setEditCodeLab(codeLabPage.codeLab);
  }, [codeLabPage.codeLab]);
  if (!editCodeLab.title) return <Loading />;
  return (
    <Container
      fluid
      style={{
        backgroundColor: 'rgb(239,247,212, 0.3)',
        minHeight: '100vh',
        marginTop: '-100px',
        paddingTop: '100px',
      }}
    >
      <Form
        style={{
          width: '80%',
          margin: '50px auto',
          // border: '3px solid black',
        }}
      >
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <FormControl
                value={editCodeLab.title}
                onChange={e =>
                  setEditCodeLab({ ...editCodeLab, title: e.target.value })
                }
                name="title"
                type="text"
              />
              <Form.Text>Title of your CodeLab.</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <FormControl
                value={editCodeLab.description}
                onChange={e =>
                  setEditCodeLab({
                    ...editCodeLab,
                    description: e.target.value,
                  })
                }
                name="description"
                type="text"
              />
              <Form.Text>
                A short one line description of your CodeLab
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Goal</Form.Label>
              <FormControl
                value={editCodeLab.goal}
                onChange={e =>
                  setEditCodeLab({ ...editCodeLab, goal: e.target.value })
                }
                name="goal"
                as="textarea"
              />
              <Form.Text>
                Explain what the goal of your project is. What are you trying to
                build? Try to be as specific as possible.
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md="2" />
          <Col>
            <Form.Group>
              <Form.Label>Looking For</Form.Label>
              <FormControl
                value={editCodeLab.lookingFor}
                onChange={e =>
                  setEditCodeLab({ ...editCodeLab, lookingFor: e.target.value })
                }
                name="lookingFor"
                as="textarea"
              />
              <Form.Text>
                What kind of people are you looking for to join your team? Try
                not to be too specific. It makes it harder to find the right
                teammates.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>How to join</Form.Label>
              <FormControl
                value={editCodeLab.joining}
                onChange={e =>
                  setEditCodeLab({ ...editCodeLab, joining: e.target.value })
                }
                name="joining"
                as="textarea"
              />
              <Form.Check type="checkbox" label="Have direct apply option" />
              <Form.Text>
                Tell others how they can join your team! How do they apply?
                Select the checkbox if you want users to apply directly from the
                website. You'll get a notification with their application
              </Form.Text>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row style={{ textAlign: 'right', paddingTop: '75px' }}>
          <div style={{ display: 'block', width: '100%' }}>
            <Button
              onClick={() => {
                dispatch(updateCodeLab(codeLabPage.codeLab.id, editCodeLab));
              }}
            >
              Save Changes
            </Button>
          </div>
        </Form.Row>
      </Form>
    </Container>
  );
}
EditCodeLab.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  codeLabPage: makeSelectCodeLabPage(),
});

function mapDispatchToProps(dispatch) {
  console.log('disaptch in mpato', dispatch);

  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditCodeLab);
