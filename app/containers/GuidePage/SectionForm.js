import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Form, FormControl, Button, Carousel } from 'react-bootstrap';
import {
  setSectionDetails,
  setSectionTitle,
  setSectionPhotos,
  deletePhotoFromSection,
  deleteSection,
} from './actions';
import makeSelectGuidePage from './selectors';
import GuideEditor from '../../components/GuideEditor';
import { useDropzone } from 'react-dropzone';

function SectionForm(props) {
  const { section, dispatch, index } = props;
  const { title, details, photos } = section;
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(details)),
  );
  const [secTitle, setSecTitle] = useState(title);

  const onEditorChange = e => {
    setEditorState(e);
    dispatch(setSectionDetails(index, convertToRaw(e.getCurrentContent())));
  };

  const [imgFiles, setImgFiles] = useState([]);
  const [imgPreviews, setImgPreviews] = useState([]);
  const onTitleChange = e => {
    setSecTitle(e.target.value);
    dispatch(setSectionTitle(index, e.target.value));
  };
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
          dispatch(setSectionPhotos(index, [...base64Files, ...photos]));
        };
        reader.readAsDataURL(acceptedFiles[i]);
      }
      setImgFiles(base64Files);
      setImgPreviews([...imgPreviews, ...imagePreviews]);
    },
    [imgPreviews],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [expandSection, setExpandSection] = useState(false);

  const handleDelete = photoIndex => {
    dispatch(deletePhotoFromSection(index, photoIndex));
  };

  const handleDeleteSection = () => {
    dispatch(deleteSection(index));
  };
  function renderButton() {
    return (
      <Button
        size="lg"
        block
        onClick={() => {
          setExpandSection(!expandSection);
        }}
        style={{
          borderTop: '6px solid #98D3E1',
          borderRight: '6px solid #98D3E1',
          borderLeft: '6px solid #98D3E1',
          marginBottom: '-6px',
          backgroundColor: '#e06287',
          color: 'black',
        }}
      >
        {title}
      </Button>
    );
  }
  return (
    <div>
      {renderButton()}

      <div
        className={expandSection ? 'show-section-form' : 'hide-section-form'}
      >
        <div style={{ textAlign: 'right' }}>
          <Button
            onClick={() => {
              handleDeleteSection();
            }}
            variant="danger"
          >
            Delete Section <i className="fas fa-trash" />
          </Button>
        </div>
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
          <GuideEditor
            editorState={editorState}
            onChangeHandler={onEditorChange}
          />
        </Form.Group>
        <Form.Label>
          <h6>Photos</h6>
        </Form.Label>
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
          <Carousel style={{ backgroundColor: 'black' }}>
            {photos.map((photo, photoIndex) => {
              const imgSrc = photo.url != null ? photo.url : photo.preview;

              return (
                <Carousel.Item key={imgSrc} style={{ textAlign: 'center' }}>
                  <div>
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
                  </div>
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
      </div>
    </div>
  );
}

SectionForm.propTypes = {
  dispatch: PropTypes.func,
  index: PropTypes.number,
  section: PropTypes.object,
};
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

export default compose(withConnect)(SectionForm);
