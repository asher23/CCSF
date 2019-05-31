import React from 'react';
import { Container } from 'react-bootstrap';
export default function Goal(props) {
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
      <h1>Goal</h1>
      <p>{props.goal}</p>
    </Container>
  );
}
