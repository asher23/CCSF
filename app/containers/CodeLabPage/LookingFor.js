import React from 'react';
import { Container } from 'react-bootstrap';
export default function LookingFor(props) {
  return (
    <Container
      fluid
      style={{
        backgroundColor: 'rgb(239,247,212, 0.3)',
        minHeight: '100vh',
        marginTop: '-66px',
        paddingTop: '70px',
      }}
    >
      <h1>Who we're looking for</h1>
      <p>{props.lookingFor}</p>
    </Container>
  );
}
