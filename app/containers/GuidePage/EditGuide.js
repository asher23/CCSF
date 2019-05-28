/**
 *
 * GuidePage
 *
 */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { EditorState, convertToRaw } from 'draft-js';
import randomString from 'randomString';
import {
  Container,
  Form,
  FormControl,
  Button,
  Carousel,
} from 'react-bootstrap';
import history from 'utils/history';
import GuideEditor from 'components/GuideEditor';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import makeSelectGuidePage, { makeSelectIsCreator } from './selectors';
import {
  addSectionToEdit,
  updateGuide,
  setEditGuideDescription,
  setEditGuideTitle,
  setEditGuidePhotos,
  deletePhotoFromGuide,
  deleteGuide,
} from './actions';
import SectionForm from './SectionForm';

export function EditGuide(props) {
  const { dispatch, guidePage } = props;
  const { id, title, sections, description, photos } = guidePage.editGuide;

  const [showAddSectionForm, setShowAddSectionForm] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');

  const [formTitle, setFormTitle] = useState(title);
  const [formDescription, setFormDescription] = useState(description);

  const [newSectionDetails, setNewSectionDetails] = useState(
    EditorState.createEmpty(),
  );
  const addSection = () => {
    dispatch(
      addSectionToEdit({
        title: newSectionTitle,
        details: convertToRaw(newSectionDetails.getCurrentContent()),
        photos: [],
      }),
    );
    setNewSectionDetails(EditorState.createEmpty());
    setNewSectionTitle('');
    setShowAddSectionForm(false);
  };

  const handleSave = () => {
    dispatch(setEditGuideTitle(formTitle));
    dispatch(setEditGuideDescription(formDescription));

    dispatch(updateGuide());
  };
  const backgroundStyle = { minHeight: '100vh' };
  const containerStyle = { textAlign: 'center', paddingTop: '30px' };
  const formStyle = {
    width: '70%',
    margin: 'auto',
    display: 'block',
    textAlign: 'left',
    marginTop: '5px',
  };

  const [imgFiles, setImgFiles] = useState([]);
  const [imgPreviews, setImgPreviews] = useState([]);

  const warningText = `Here is where you can edit your guide. Please remember to save your
  changes or they may be lost!`;
  const onDrop = useCallback(
    acceptedFiles => {
      const base64Files = [];
      const imagePreviews = [];
      for (let i = 0; i < acceptedFiles.length; i += 1) {
        const previewToAdd = URL.createObjectURL(acceptedFiles[i]);
        imagePreviews.push(previewToAdd);
        const reader = new FileReader();
        reader.onloadend = () => {
          base64Files.push({ file: reader.result, preview: previewToAdd });
          dispatch(setEditGuidePhotos([...base64Files, ...photos]));
        };
        reader.readAsDataURL(acceptedFiles[i]);
      }
      setImgFiles(base64Files);
      setImgPreviews([...imgPreviews, ...imagePreviews]);
    },
    [imgPreviews],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDelete = photoIndex => {
    dispatch(deletePhotoFromGuide(photoIndex));
  };

  const handleDeleteGuide = () => {
    const randomPass = randomString.generate(6);
    const response = prompt(
      `are you sure about this? Please type ${randomPass} to continue`,
    );
    if (response === randomPass) dispatch(deleteGuide());
    console.log(response);
  };

  return (
    <div className="background-for-container" style={backgroundStyle}>
      <Container style={containerStyle}>
        <h6>{warningText}</h6>
        <br /> <br />
        <Form style={formStyle}>
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
          <Form.Group size="lg">
            <Form.Label>
              <h3>Main Photos</h3>
            </Form.Label>
            <div style={{ padding: '30px' }}>
              <div style={{ backgroundColor: 'white' }}>
                <div style={{ border: '1px dotted black' }} {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>
                      Drop the files here ... <i className="fas fa-upload" />
                    </p>
                  ) : (
                    <p>
                      Drag drop some files here, or click to select files{' '}
                      <i className="fas fa-upload" />
                    </p>
                  )}
                </div>
              </div>
              <Carousel style={{ backgroundColor: 'black' }}>
                {photos.map((photo, photoIndex) => {
                  const imgSrc = photo.url != null ? photo.url : photo.preview;
                  return (
                    <Carousel.Item key={imgSrc} style={{ textAlign: 'center' }}>
                      <img
                        src={imgSrc}
                        alt="carousel slide"
                        style={{
                          objectFit: 'scale-down',
                          height: '400px',
                          width: '80%',
                          margin: 'auto',
                        }}
                      />
                      <Carousel.Caption>
                        <Button
                          onClick={() => {
                            handleDelete(photoIndex);
                          }}
                          variant="danger"
                        >
                          Delete! <i className="fas fa-trash" />
                        </Button>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
          </Form.Group>
          <Form.Label>
            <h3>Sections</h3>
          </Form.Label>
          {sections.map((section, index) => (
            <SectionForm section={section} index={index} />
          ))}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
                <GuideEditor
                  editorState={newSectionDetails}
                  onChangeHandler={setNewSectionDetails}
                />
              </Form.Group>
              <Button onClick={() => addSection()}>Add Section</Button>
            </>
          )}
          <br />
          <br />
          <div style={{ paddingBottom: '50px', textAlign: 'right' }}>
            <Button
              variant="danger"
              style={{ marginRight: '15px' }}
              onClick={() => {
                handleDeleteGuide();
              }}
            >
              {' '}
              Delete Entire Guide
            </Button>
            <Button
              style={{ marginRight: '15px' }}
              onClick={() => history.push(`/guides/${id}`)}
            >
              Cancel
            </Button>
            <Button onClick={() => handleSave()}>Save</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

EditGuide.propTypes = {
  dispatch: PropTypes.func.isRequired,
  guidePage: PropTypes.object,
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
