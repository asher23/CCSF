/**
 *
 * GuideList
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ItemList from 'components/ItemList';
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
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGuideList from './selectors';
import reducer from './reducer';
import saga from './saga';
import { setGuides, getGuides, createGuide } from './actions';
import CreateGuideForm from '../../components/Forms/CreateGuideForm';

export function GuideList(props) {
  const { dispatch, guideList } = props;
  const { guides } = guideList;
  useInjectReducer({ key: 'guideList', reducer });
  useInjectSaga({ key: 'guideList', saga });

  const [guidesList, setGuidesList] = useState('guidesList');
  const [showCreate, setShowCreate] = useState('showCreate');
  // setShowCreate(false);

  useEffect(() => {
    setShowCreate(false);
  }, []);
  useEffect(() => {
    const guidesToSet = dispatch(getGuides());
    console.log('gudeis', guidesToSet);
    // dispatch(getGuides());
  }, []);

  const onCreateGuideSubmit = (title, description) => {
    dispatch(createGuide({ title, description }));
  };
  return (
    <div className="background-for-container">
      <Container>
        <Row>
          <Button onClick={() => setShowCreate(!showCreate)}>
            Create Guide
          </Button>
        </Row>
        {showCreate && (
          <Row>
            <CreateGuideForm onSubmit={onCreateGuideSubmit} />
          </Row>
        )}
        <Row>
          <Col>{guides && <ItemList items={guides} />}</Col>
        </Row>
      </Container>
    </div>
  );
}

GuideList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  guideList: makeSelectGuideList(),
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

export default compose(withConnect)(GuideList);
