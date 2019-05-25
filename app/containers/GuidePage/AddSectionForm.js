import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Editor,
  EditorState,
  EditorChangeType,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import {
  Container,
  Navbar,
  Form,
  FormControl,
  Button,
  Nav,
  Col,
  Row,
  InputGroup,
} from 'react-bootstrap';
import { setSectionDetails, setSectionTitle } from './actions';
import makeSelectGuidePage from './selectors';

function AddSectionForm(props) {
  const { section, dispatch, index } = props;
  const { id, title, details } = section;

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(details)),
  );
  const [secTitle, setSecTitle] = useState(title);

  const onEditorChange = e => {
    setEditorState(e);
    dispatch(setSectionDetails(index, convertToRaw(e.getCurrentContent())));
  };

  const onTitleChange = e => {
    setSecTitle(e.target.value);
    dispatch(setSectionTitle(index, e.target.value));
  };

  return (
    <div>
      <>
        <Form.Group>
          <Form.Label>
            <h6>Section Title</h6>
          </Form.Label>
          <FormControl
            onChange={e => onTitleChange(e)}
            placeholder="New Section"
            name="newSectionTitle"
            value={secTitle}
            type="text"
            size="md"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <h6>Details</h6>
          </Form.Label>
          <div
            style={{
              minHeight: '100px',
              border: '1px dotted black',
              padding: '10px',
            }}
          >
            <Editor
              editorState={editorState}
              onChange={e => onEditorChange(e)}
            />
          </div>
        </Form.Group>
        {/* <Button onClick={() => addSection()}>Add Section</Button> */}
      </>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  guidePage: makeSelectGuidePage(),
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

export default compose(withConnect)(AddSectionForm);
