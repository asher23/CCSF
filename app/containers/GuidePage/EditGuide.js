/**
 *
 * GuidePage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Editor, EditorState, EditorChangeType, convertToRaw } from 'draft-js';
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
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGuidePage, { makeSelectIsCreator } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { setGuide, getGuide, setEditGuide, addSectionToEdit } from './actions';
import GuideEditor from './GuideEditor';
import AddSectionForm from './AddSectionForm';

export function EditGuide(props) {
  const { guide, dispatch } = props;
  const { title, id, creatorId, comments, sections, description } = guide;

  const [showAddSectionForm, setShowAddSectionForm] = useState(false);
  const [addedSections, setAddedSections] = useState([]);

  const [editSections, setEditSections] = useState(sections);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionDetails, setNewSectionDetails] = useState('');

  const [formTitle, setFormTitle] = useState(title);
  const [formDescription, setFormDescription] = useState(description);

  const [editorStateTwo, setEditorStateTwo] = React.useState(
    EditorState.createEmpty(),
  );
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(editorStateTwo.getCurrentContent()),
  );
  const addSection = () => {
    // setEditorState(
    //   EditorState.push(editorState, editorStateTwo.getCurrentContent()),
    // );
    // setEditSections([
    //   ...editSections,
    //   {
    //     title: newSectionTitle,
    //     details: newSectionDetails,
    //   },
    // ]);
    dispatch(
      addSectionToEdit({
        title: newSectionTitle,
        details: convertToRaw(editorStateTwo.getCurrentContent()),
      }),
    );
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <h2>
        Here is where you can edit your guide. Please remember to save your
        changes or they will be lost!
      </h2>
      <Form
        style={{
          width: '70%',
          margin: 'auto',
          display: 'block',
          textAlign: 'left',
        }}
      >
        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
          <Form.Group size="lg">
            <Form.Label>
              <h3>Title</h3>
            </Form.Label>
            <FormControl
              value={formTitle}
              onChange={e => setFormTitle(e.target.value)}
              name="title"
              size="lg"
              type="text"
            />
          </Form.Group>
          <Form.Group size="lg">
            <Form.Label>
              <h3>Description</h3>
            </Form.Label>
            <FormControl
              value={formDescription}
              onChange={e => setFormDescription(e.target.value)}
              name="description"
              size="lg"
              type="text"
            />
          </Form.Group>
        </div>
        <Form.Label>
          <h3>Sections</h3>
        </Form.Label>
        {sections.map((section, index) => {
          return (
            <div key={section.id}>
              <AddSectionForm section={section} index={index} />
            </div>
          );
        })}
        <div style={{ textAlign: 'center' }}>
          <Button onClick={() => setShowAddSectionForm(true)}>
            <i className="fas fa-plus" />
          </Button>
        </div>

        {showAddSectionForm && (
          <>
            <Form.Group>
              <Form.Label>
                <h4>Section Title</h4>
              </Form.Label>
              <FormControl
                onChange={e => setNewSectionTitle(e.target.value)}
                placeholder="New Section"
                name="newSectionTitle"
                type="text"
                size="md"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <h4>Details</h4>
              </Form.Label>
              <div
                style={{
                  minHeight: '100px',
                  border: '1px dotted black',
                  padding: '10px',
                }}
              >
                <Editor
                  editorState={editorStateTwo}
                  onChange={es => setEditorStateTwo(es)}
                />
              </div>
            </Form.Group>
            <Button onClick={() => addSection()}>Add Section</Button>
          </>
        )}
        <br />
        <br />
        <div>
          <Button type="click">Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </div>
  );
}

EditGuide.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  guidePage: makeSelectGuidePage(),
  isCreator: makeSelectIsCreator(),
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

export default compose(withConnect)(EditGuide);
