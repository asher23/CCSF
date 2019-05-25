/**
 *
 * ItemList
 *
 */
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
import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function CreateGuideForm({ onSubmit }) {
  const [title, setTitle] = useState('title');
  const [description, setDescription] = useState('description');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('eee', e.target.title.value);
    onSubmit(e.target.title.value, e.target.description.value);
  };
  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <FormControl
        onChange={e => setTitle(e.target.value)}
        required
        type="text"
        name="title"
        placeholder="Enter title"
      />
      <FormControl
        onChange={e => setDescription(e.target.value)}
        required
        type="text"
        name="description"
        placeholder="Enter description"
      />
      <Button type="submit">Submit me!</Button>
    </Form>
  );
}

CreateGuideForm.propTypes = {};

export default CreateGuideForm;
