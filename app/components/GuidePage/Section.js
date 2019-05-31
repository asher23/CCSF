/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import ReactHtmlParser from 'react-html-parser';
import { Container, Button, Row, Col, Carousel } from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';
import './style.css';

export default function Section({ section, secIndex }) {
  const sectionDetails = ReactHtmlParser(
    stateToHTML(convertFromRaw(section.details)),
  );
  const { photos } = section;

  const [lightBoxState, setLightBoxState] = useState(false);
  const [lightBoxPhotoIndex, setLightBoxPhotoIndex] = useState(0);

  const [showFull, setShowFull] = useState(secIndex === 0);

  return (
    <Row
      style={{
        margin: '0px auto',
        // border: '1px solid black',
        borderRadius: '8px',
        padding: '3px',
      }}
    >
      <Col>
        <Row>
          <div
            className="section-g-title"
            onClick={() => setShowFull(!showFull)}
            style={{
              fontSize: '40px',
              paddingLeft: '8px',
              paddingTop: '0px',
              paddingBottom: '0px',
              lineHeight: '40px',
              width: '100%',
              marginBottom: '5px',
              textAlign: 'left',
              backgroundColor: 'rgba(221, 221, 221, 0.7)',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                // backgroundColor: 'blue',
                // color: 'green',
                borderRight: '5px solid black',
                // width: '60px',
                textAlign: 'left',
                paddingRight: '10px',
                paddingLeft: '10px',
              }}
            >
              {secIndex + 1}
            </div>

            <div style={{ display: 'inline-block', paddingLeft: '9px' }}>
              {section.title}
            </div>
          </div>
        </Row>
        <div className={showFull ? 'show-section-g' : 'hide-section-g'}>
          <Row style={{ marginBottom: '0px' }}>
            <div style={{ textAlign: 'left' }}>{sectionDetails}</div>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Carousel
              className="make-select-dark"
              style={{
                // backgroundColor: 'black',
                width: '80%',
                margin: '5px auto',
                marginTop: '0px',
              }}
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
          </Row>
        </div>
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
