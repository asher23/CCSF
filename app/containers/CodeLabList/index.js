/**
 *
 * CodeLabList
 *
 */

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
} from 'react-bootstrap';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCodeLabList from './selectors';
import { createCodeLab, getCodeLabs } from './actions';
import reducer from './reducer';
import saga from './saga';
import ItemList from 'components/ItemList';
import Loading from 'components/Loading';

export function CodeLabList({ dispatch, codeLabList }) {
  useInjectReducer({ key: 'codeLabList', reducer });
  useInjectSaga({ key: 'codeLabList', saga });

  useEffect(() => {
    console.log('why do u keep firing?');
    dispatch(getCodeLabs());
  }, []);
  const handleSubmit = e => {
    console.log('clicked');

    e.preventDefault();
    const codeLab = {
      title: e.target.title.value,
      description: e.target.description.value,
      goal: e.target.goal.value,
      lookingFor: e.target.lookingFor.value,
      joining: e.target.joining.value,
    };
    dispatch(createCodeLab(codeLab));
  };
  // if (!codeLabList.codeLabs) return <Loading />;

  return (
    <div>
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Group size="lg">
          <Form.Label>
            <h3>Title</h3>
          </Form.Label>
          <FormControl name="title" size="lg" type="text" />
        </Form.Group>
        <Form.Group size="lg">
          <Form.Label>
            <h3>Description</h3>
          </Form.Label>
          <FormControl name="description" size="lg" type="text" />
        </Form.Group>
        <Form.Group size="lg">
          <Form.Label>
            <h3>Goal</h3>
          </Form.Label>
          <FormControl name="goal" size="lg" type="text" />
        </Form.Group>
        <Form.Group size="lg">
          <Form.Label>
            <h3>Looking For</h3>
          </Form.Label>
          <FormControl name="lookingFor" size="lg" type="text" />
        </Form.Group>
        <Form.Group size="lg">
          <Form.Label>
            <h3>How to join</h3>
          </Form.Label>
          <FormControl name="joining" size="lg" type="text" />
        </Form.Group>
        <Button type="submit"> Submit ! </Button>
      </Form>
      <ItemList items={codeLabList.codeLabs} />
    </div>
  );
}

CodeLabList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  codeLabList: makeSelectCodeLabList(),
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

export default compose(withConnect)(CodeLabList);
