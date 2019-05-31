import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Form,
  FormControl,
  Button,
  Carousel,
  InputGroup,
} from 'react-bootstrap';
import Loading from 'components/Loading';
import { useDropzone } from 'react-dropzone';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { updateUser } from './actions';
import makeSelectSettingsPage, { makeSelectApp } from './selectors';

export function ProfileTab({ app, dispatch, settingsPage }) {
  const { user } = app;
  const {
    username,
    firstName,
    lastName,
    email,
    introduction,
    id,
    photo,
  } = user;
  console.log('user', user);
  const [formUsername, setFormUsername] = useState('');
  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formIntroduction, setFormIntroduction] = useState('');
  const [formPhoto, setFormPhoto] = useState('');
  const [profilePreview, setProfilePreview] = useState('');
  console.log('formusrname', formEmail);
  const handleSave = () => {
    dispatch(
      updateUser(id, {
        username: formUsername,
        firstName: formFirstName,
        lastName: formLastName,
        email: formEmail,
        introduction: formIntroduction,
        photo: formPhoto,
      }),
    );
  };

  const onDrop = useCallback(acceptedFiles => {
    setProfilePreview(URL.createObjectURL(acceptedFiles[0]));

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormPhoto({ file: reader.result });
    };
    reader.readAsDataURL(acceptedFiles[0]);
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    setFormUsername(username);
    setFormFirstName(firstName);
    setFormLastName(lastName);
    setFormEmail(email);
    setFormIntroduction(introduction);
  }, username);
  if (settingsPage.settingsState === 'loading') return <Loading />;
  if (settingsPage.settingsState === 'successful')
    return <h1>You Successfully updated settings</h1>;
  return (
    <div
      // className="overflow-auto"
      style={{ maxHeight: '100%' }}
    >
      <Form
        style={{
          width: '90%',
          margin: '20px auto',
          border: '2px solid black',
        }}
      >
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Username</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={formUsername}
            onChange={e => {
              setFormUsername(e.target.value);
            }}
            type="text"
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>First Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={formFirstName}
            onChange={e => {
              setFormFirstName(e.target.value);
            }}
            type="text"
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Last Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={formLastName}
            onChange={e => {
              setFormLastName(e.target.value);
            }}
            type="text"
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Email</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={formEmail}
            onChange={e => {
              setFormEmail(e.target.value);
            }}
            type="text"
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Introduction</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={formIntroduction}
            onChange={e => {
              setFormIntroduction(e.target.value);
            }}
            type="text"
          />
        </InputGroup>
        <div style={{ border: '1px dotted black' }} {...getRootProps()}>
          <input {...getInputProps()} multiple={false} />
          {isDragActive ? (
            <p>
              Drop the file here ... <i className="fas fa-upload" />
            </p>
          ) : (
            <p>
              Drag drop a file here, or click to select file
              <i className="fas fa-upload" />
            </p>
          )}
        </div>
        <img
          src={photo && photo.url ? photo.url : profilePreview}
          style={{ height: '300px', width: '400px', objectFit: 'scale-down' }}
          alt="profile pic"
        />
        <br />
        <Button onClick={() => handleSave()}>Save</Button>
      </Form>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
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

export default compose(withConnect)(ProfileTab);
