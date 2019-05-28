import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
function Item(props) {
  const { title, description, id, sections } = props.item;
  const itemListRef = useRef(id);
  const [spans, setSpans] = useState(0);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    itemListRef.current.addEventListener(
      'load',
      setSpans(Math.ceil(itemListRef.current.clientHeight / 25)),
    );
  });

  let imgSrc = `https://loremflickr.com/320/240?random=${Math.random()}`;
  if (props.item.photos) {
    if (props.item.photos[0]) imgSrc = props.item.photos[0].url;
  }
  return (
    <div style={{ gridRowEnd: `span ${spans}` }} className="something">
      <Card style={{ height: '100%' }}>
        <div ref={itemListRef}>
          <Card.Img variant="top" src={imgSrc} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description} </Card.Text>
            <Button block variant="primary">
              <Link to={`/guides/${id}`}>Visit!</Link>
            </Button>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}

Item.propTypes = { item: PropTypes.object };

export default Item;
