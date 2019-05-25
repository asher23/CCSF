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
import makeSelectGuidePage, { makeSelectIsCreator } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { setGuide, getGuide } from './actions';
import EditGuide from './EditGuide';
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  console.log('feife', startIndex, endIndex, list);
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

export function GuidePage(props) {
  const { dispatch, guidePage, match, isCreator } = props;
  const { guide, editGuide } = guidePage;
  useInjectReducer({ key: 'guidePage', reducer });
  useInjectSaga({ key: 'guidePage', saga });

  const [items, setItems] = useState(getItems(3));
  const [editMode, setEditMode] = useState(false);
  console.log('props', props);
  useEffect(() => {
    dispatch(setGuide({ id: match.params.id }));
    dispatch(getGuide());
    // setItems(getItems(10));
  }, []);
  console.log('itemss', items);
  // useEffect(() => {
  // }, items)

  const onDragEnd = function(result) {
    console.log('drag end result: ', result);

    // dropped outside the list
    if (!result.destination) {
      return;
    }
    console.log('itemss', items);
    const itemss = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems(itemss);
  };

  return (
    <div className="background-for-container">
      <Container
        style={{
          backgroundColor: 'white',
          textAlign: 'center',
          paddingTop: '30px',
        }}
      >
        <Row style={{ display: 'inline-block', width: '80%' }}>
          {isCreator ? (
            <Button onClick={() => setEditMode(true)} type="button">
              Edit
            </Button>
          ) : null}
        </Row>
        {editMode ? (
          <EditGuide guide={editGuide} />
        ) : (
          <>
            <Row style={{ display: 'inline-block', width: '80%' }}>
              <h1>{guide.title}</h1>
            </Row>
            <Row style={{ display: 'inline-block', width: '80%' }}>
              <h2>{guide.description}</h2>
            </Row>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                            )}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </>
        )}
      </Container>
    </div>
  );
}

GuidePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  guidePage: makeSelectGuidePage(),
  isCreator: makeSelectIsCreator(),
  // guide: makeSelectGuidePage().guide,
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

export default compose(withConnect)(GuidePage);
