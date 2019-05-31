/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * GuidePage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Container, Button, Row, Carousel } from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGuidePage, { makeSelectIsCreator } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { setGuide, getGuide } from './actions';
import './style.css';
import SectionList from '../../components/GuidePage/SectionList';

export function GuidePage(props) {
  const { dispatch, guidePage, match, isCreator } = props;
  const { guide } = guidePage;
  const { title, description, sections, photos } = guide;
  useInjectReducer({ key: 'guidePage', reducer });
  useInjectSaga({ key: 'guidePage', saga });

  const [showAuthorBar, setShowAuthorBar] = useState(false);
  const [lightBoxState, setLightBoxState] = useState(false);
  const [lightBoxPhotoIndex, setLightBoxPhotoIndex] = useState(0);

  useEffect(() => {
    dispatch(setGuide({ id: match.params.id }));
    dispatch(getGuide());
  }, []);

  if (!guide.sections || !guide.title) return null;
  return (
    <div style={{ backgroundColor: 'rgb(239, 247, 212, 0.4)' }} className="">
      <Container
        style={{
          backgroundColor: 'rgb(239, 247, 212, 0.2)',
          textAlign: 'center',
        }}
      >
        <div style={{ width: '80%', display: 'inline-block' }}>
          {isCreator && (
            <>
              <Row>
                <div
                  className={
                    showAuthorBar ? 'show-author-tools' : 'hide-author-tools'
                  }
                >
                  Author Tools:
                  <Button variant="dark" type="button">
                    <Link to={`/guides/${guide.id}/edit`}>
                      Edit <i className="far fa-edit" />
                    </Link>
                  </Button>
                </div>
              </Row>
              <Row>
                <Button
                  onClick={() => setShowAuthorBar(!showAuthorBar)}
                  size="lg"
                >
                  {showAuthorBar ? (
                    <i className="fas fa-caret-up" />
                  ) : (
                    <i className="fas fa-caret-down" />
                  )}
                </Button>
              </Row>
            </>
          )}
          <Row
            style={{
              display: 'inline-block',
              margin: '15px auto',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '60px', fontWeight: 'bold' }}>{title}</p>
            <div style={{ textAlign: 'right' }}>
              <p
                style={{
                  display: 'inline-block',
                  fontSize: '20px',
                  textAlign: 'right',
                  textDecoration: 'italics',
                  color: 'black',
                  lineheight: '20px',
                  backgroundColor: 'aqua',
                  padding: '0px 3px',
                }}
              >
                Johnathon Doe
              </p>
            </div>
            <p
              style={{
                fontSize: '25px',
                borderTop: '1px solid black',
                borderBottom: '1px solid black',
                fontWeight: '100',
                paddingTop: '30px',
                paddingBottom: '30px',
              }}
            >
              {description}
            </p>
          </Row>
        </div>
      </Container>

      <Carousel
        style={{
          backgroundColor: 'black',
          width: '100%',
          margin: 'auto',
          marginBottom: '40px',
        }}
      >
        {photos.map((photo, idx) => {
          return (
            <Carousel.Item key={photo.url}>
              <img
                onClick={() => {
                  setLightBoxState(true);
                  setLightBoxPhotoIndex(idx);
                }}
                src={photo.url}
                alt="carousel slide"
                style={{
                  objectFit: 'scale-down',
                  height: '600px',
                  width: '100%',
                }}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
      {lightBoxState && (
        <Lightbox
          mainSrc={photos[lightBoxPhotoIndex].url}
          nextSrc={photos[(lightBoxPhotoIndex + 1) % photos.length].url}
          prevSrc={
            photos[(lightBoxPhotoIndex + photos.length - 1) % photos.length].url
          }
          clickOutsideToClose
          onCloseRequest={() => {
            setLightBoxState(false);
          }}
          onMovePrevRequest={() =>
            setLightBoxPhotoIndex(
              (lightBoxPhotoIndex + photos.length - 1) % photos.length,
            )
          }
          onMoveNextRequest={() =>
            setLightBoxPhotoIndex((lightBoxPhotoIndex + 1) % photos.length)
          }
        />
      )}
      <Container
        style={{
          backgroundColor: 'rgb(239, 247, 212, 0.2)',
          textAlign: 'center',
        }}
      >
        <div style={{ width: '80%', display: 'inline-block' }}>
          <SectionList sections={sections} />
        </div>
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

/*  


















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
            import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
  */
