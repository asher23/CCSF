/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import ReactHtmlParser from 'react-html-parser';
import { Container, Button, Row, Col, Carousel } from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';

export default function Section({ section }) {
  const sectionDetails = ReactHtmlParser(
    stateToHTML(convertFromRaw(section.details)),
  );
  const { photos } = section;

  const [lightBoxState, setLightBoxState] = useState(false);
  const [lightBoxPhotoIndex, setLightBoxPhotoIndex] = useState(0);

  return (
    <Row style={{ margin: '40px auto' }}>
      <Col>
        <Row>
          <div
            style={{
              fontSize: '45px',
              textDecoration: 'underline',
              margin: 'auto',
              display: 'block',
            }}
          >
            {section.title}
          </div>
        </Row>
        <Carousel
          style={{ backgroundColor: 'black', width: '80%', margin: 'auto' }}
        >
          {photos.map(photo => {
            return (
              <Carousel.Item key={photo.url}>
                <img
                  src={photo.url}
                  onClick={() => setLightBoxState(true)}
                  alt="carousel slide"
                  style={{
                    objectFit: 'scale-down',
                    height: '300px',
                    width: '80%',
                  }}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
        <Row>
          <div style={{ textAlign: 'left' }}>{sectionDetails}</div>
        </Row>
        {lightBoxState && (
          <Lightbox
            mainSrc={photos[lightBoxPhotoIndex].url}
            nextSrc={photos[(lightBoxPhotoIndex + 1) % photos.length].url}
            prevSrc={
              photos[(lightBoxPhotoIndex + photos.length - 1) % photos.length]
                .url
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
      </Col>
    </Row>
  );
}
